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
   res.status(200).send(Users)
})
app.get("/users/:id/purchases", (req:Request, res: Response)=>{

    const useId = req.params.useId 
    const result = Purchase.find((Purchases)=>{
      return Purchases.userId === useId
    })
    res.status(200).send({result})
  })

app.get('/products', (req: Request, res: Response)=>{
   res.status(200).send(Products)
})

app.get('/products/search', (req: Request, res: Response)=>{
   const q = req.query.q as string
   const result = Products.filter((Products)=>{
     return Products.name.toLowerCase().includes(q.toLowerCase())
   })
   res.status(200).send(result)
})
app.get("/products/:id", (req:Request, res: Response)=>{

    const id = req.params.id  
    const result = Products.find((Product)=>{
      return Product.id === id
    })
    
  
    res.status(200).send({result})
  })

// endpoint post

app.post('/users', (req:Request, res: Response)=>{

    const {id, email, password} = req.body as TUser 
    const newUserOne = {
        id, 
        email,
        password
    }
    Users.push(newUserOne) 
    res.status(201).send("Cadastro realizado com sucesso")
})

app.post('/products', (req:Request, res: Response)=>{

    const {id, name, price, category} = req.body as TProduct
    const newUserOne = {
        id, 
        name,
        price,
        category
    }
    Products.push(newUserOne) 
    res.status(201).send("Produto realizado com sucesso")
})

app.post('/purchase', (req:Request, res: Response)=>{

    const {userId, productId, quantity, totalPrice} = req.body as TPurchase  
    const newPurchase = {
        userId, 
        productId, 
        quantity, 
        totalPrice
    }
    Purchase.push(newPurchase)
    res.status(201).send("Compra cadastrada com sucesso")
})

// endpoint delete

app.delete("/users/:id", (req:Request, res:Response)=>{

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
    
})

app.delete("/products/:id", (req:Request, res:Response)=>{

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
})

// metodo put

app.put("/users/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as number | undefined
    
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
})

app.put("/products/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.name as  string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory =  req.body.category as CATEGORY | undefined

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
})