import { Users, Products, Purchase } from "./database";
import { TUser, TProduct, TPurchase, CATEGORY } from "./types";
import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, ()=>{
    console.log("Servidor rodando na porta 3003")
})

// endpoint get

app.get('/ping', (req: Request, res: Response)=>{
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response)=>{

   try {
     res.status(200).send(Users)

   } catch (error: any) {
     console.log(error)
     if(res.statusCode === 200) {
        res.status(500)
     }
     res.send(error.message)
   }
})
app.get("/users/:id/purchases", (req:Request, res: Response)=>{
 
    try{
    const useId = req.params.useId 
    const result = Purchase.find((Purchases)=>{
      return Purchases.userId === useId
    })
    if (!result) {
        res.status(404)
        throw new Error("Usuario não existe")
    }
    const PurchaseidUser = Purchase.filter((p) => {
        return p.userId === result.userId
    })
    if (!PurchaseidUser[0]) {
        res.status(201).send("Usuario não realizou nenhuma compra")
    } else {
        res.status(200).send(PurchaseidUser)
    }
  } catch (error: any) {
     console.log(error)
     if(res.statusCode === 200) {
        res.status(500)
     }
     res.send(error.message)
  }
  })

app.get('/products', (req: Request, res: Response)=>{

    try {
      res.status(200).send(Products)

    } catch (error: any) {
       console.log(error)
       if(res.statusCode === 200){
          res.status(500)
       }
       res.send(error.message)
    }
   
})

app.get('/products/search', (req: Request, res: Response)=>{
    try {
        const q = req.query.q as string
        const result = Products.filter((Products)=>{
          return Products.name.toLowerCase().includes(q.toLowerCase())
        })
     
        if (q.length < 1) {
            res.status(400)
            throw new Error("Query params deve possuir pelo menos 1 caracter")
        }

        if (result.length < 1) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
   
})
app.get("/products/:id", (req:Request, res: Response)=>{

    try {
    const id = req.params.id  
    const result = Products.find((Product)=>{
      return Product.id === id
    })
    
    if (!result) {
        res.status(404)
        throw new Error("Produto não encontrado")
    }
    res.status(200).send(result)

  } catch (error: any) {
    console.log(error)
    if(res.statusCode === 200) {
        res.status(500)
    }
    res.send(error.message)
  }
  })

// endpoint post

app.post('/users', (req:Request, res: Response)=>{
    
    try {
    const {id, email, password} = req.body as TUser 
    const newUserOne = {
        id, 
        email,
        password
    }
    if (newUserOne.id.length < 1 || newUserOne.email.length < 1) {
        res.status(400)
        throw new Error("Email ou id faltando no cadastro")

    }
    if (newUserOne.password < 1) {
        res.status(400)
        throw new Error("Password faltando no cadastro")
    }
    const searchId = Users.find((user) => {
        return user.id === newUserOne.id
    })
    const searchEmail = Users.find((user) => {
        return user.email === newUserOne.email
    })
    if (searchId || searchEmail) {
        res.status(400)
        throw new Error("Email ou id ja cadastrado")
    }

    Users.push(newUserOne) 
    res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
       console.log(error)
       if(res.statusCode === 200){
         res.status(500)
       }
       res.send(error.message)
    }
})

app.post('/products', (req:Request, res: Response)=>{
    
    try {
    const {id, name, price, category} = req.body as TProduct
    const newUserOne = {
        id, 
        name,
        price,
        category
    }
    if (newUserOne.id.length < 1 || newUserOne.name.length < 1 || newUserOne.category.length < 1) {
        res.status(400)
        throw new Error("Id faltando cadastro de produtos")
    }
    if (newUserOne.price < 1) {
        res.status(400)
        throw new Error("Preço faltando no cadastro de produtos")
    }
    const searchIdProduct = Products.find((Product) => {
        return Product.id === newUserOne.id
    })
    if (searchIdProduct) {
        res.status(400)
        throw new Error("Id ja cadastrado")
    }

    Products.push(newUserOne) 
    res.status(201).send("Produto realizado com sucesso")

  } catch (error: any) {
     console.log(error)
     if(res.statusCode === 200) {
        res.status(500)
     }
     res.send(error.message)
  }
})

app.post('/purchase', (req:Request, res: Response)=>{
    
    try {
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase  
    const newPurchase = {
        userId, 
        productId, 
        quantity, 
        totalPrice
    }
    if (newPurchase.userId.length < 1 || newPurchase.productId.length < 1 || newPurchase.quantity < 1) {
        res.status(400)
        throw new Error("Informações incompletas")
    }
    const searchIdUser = Users.find((idUser) => {
        return idUser.id === newPurchase.userId
    })
    const searchIdProduct = Products.find((idProduct) => {
        return idProduct.id === newPurchase.productId
    })
    if (searchIdUser && searchIdProduct) {
        const total = searchIdProduct.price * newPurchase.quantity
        newPurchase.totalPrice = total
        Purchase.push(newPurchase)
        res.status(201).send("Compra registrada com sucesso!")
    } if (!searchIdUser) {
        res.status(404).send("Usuario não existe")
    } else {
        res.status(404).send("Produto não existe no estoque")
    }
   } catch (error: any) {
       console.log(error)
       if(res.statusCode === 200) {
         res.status(500)
       }
       res.send(error.message)
   }
})

// endpoint delete

app.delete("/users/:id", (req:Request, res:Response)=>{
  
    try {
    const id = req.params.id  as string

    const usersIndex = Users.findIndex((user)=>{
        return user.id === id
    })
    console.log("Index:", usersIndex)
     
    if (usersIndex>=0){
        Users.splice(usersIndex,1)
        res.status(200).send("User apagado com sucesso")        
    }else{
        res.status(200).send("User não encontrado")    
    }  
  } catch (error: any) {
      console.log(error)
      if(res.statusCode === 200) {
        res.status(500)
      }
      res.send(error.message)
  }
    
})

app.delete("/products/:id", (req:Request, res:Response)=>{

    try {
    const id = req.params.id  as string
    
    const productsIndex = Products.findIndex((Product)=>{
        return Product.id === id
    })
    console.log("Index:", productsIndex)
     
    if (productsIndex>=0){
        Products.splice(productsIndex,1)
        res.status(200).send("Produto apagado com sucesso")        
    }else{
        res.status(200).send("Produto não encontrado")    
    } 
   } catch (error: any) {
      console.log(error)
      if(res.statusCode === 200) {
        res.status(500)
      }
      res.send(error.message)
   }
})

// metodo put

app.put("/users/:id", (req:Request, res:Response)=>{

    try {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as number | undefined
    
    const searchIdUser = Users.find((user) => {
        return user.id === id
    })
    if (!searchIdUser) {
        res.status(400)
        throw new Error("Id não existe, insira uma id válida")
    }

    if (!newId) {
        res.status(400)
        throw new Error("Digite um novo id para o usuario")
    }
    if (!newEmail) {
        res.status(400)
        throw new Error("Digite uma novo email para o usuário")
    }
    if (!newPassword) {
        res.status(400)
        throw new Error("Digite uma nova senha para o usuário")
    }

    const user = Users.find((user)=>{
        return user.id === id
    })
    if (user){
        user.id = newId ||  user.id
        user.email = newEmail || user.email
        user.password = isNaN(newPassword)? user.password: newPassword

        res.status(200).send("Cadastro atualizado com sucesso")
    }else{
        res.status(404).send("Cadastro não encontrado")
    }
   } catch (error: any) {
     console.log(error)
     if(res.statusCode === 200) {
        res.status(500)
     }
     res.send(error.message)
   }
})

app.put("/products/:id", (req:Request, res:Response)=>{

    try {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.name as  string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory =  req.body.category as CATEGORY | undefined

    const searchIdProduct = Products.find((product) => {
        return product.id === id
    })
    if (!searchIdProduct) {
        res.status(400)
        throw new Error("Id não existe, insira uma id válida")
    }
    if (!newPrice) {
        res.status(400)
        throw new Error("Digite um novo preço para o produto")
    }
    if (!newCategory) {
        res.status(400)
        throw new Error("Digite uma nova categoria para o produto")
    }
    if (!newOwnerName) {
        res.status(400)
        throw new Error("Digite um novo nome para o produto")
    }

    const product = Products.find((product)=>{
        return product.id === id
    })
    if (product){
        product.id = newId || product.id
        product.name = newOwnerName || product.name
        product.price = isNaN(newPrice)? product.price:newPrice
        product.category = newCategory || product.category

        res.status(200).send("Produto atualizado com sucesso")
    }else{
        res.status(404).send("Produto não encontrado")
    } 
  } catch (error: any) {
      console.log(error)
      if(res.statusCode === 200) {
        res.status(500)
      }
      res.send(error.message)
  }
})