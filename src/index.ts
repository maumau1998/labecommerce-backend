import { Users, Products, Purchase } from "./database";
import { TUser, TProduct, TPurchase, CATEGORY } from "./types";
import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from "./database/knex";

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

// intro-knex

app.get('/users', async (req: Request, res: Response) => {

    try {

        const result = await db.raw(`SELECT * FROM users`)
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM products;
        `)
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q
        const result: TProduct[] = await db.raw(`
            SELECT * FROM products
            WHERE name LIKE "%${q}%";
        `)

        if(result.length < 1){
            res.status(400)
            throw new Error("Produto não encontrado")
        }
        
        if(typeof q !=="string"){
            res.status(400)
            throw new Error("id deve ser um texto")
            }

        if(q.length <= 2){
            res.status(400)
            throw new Error("Nome de produto inválido. Nome deve contar no mínimo 2 caracteres")
        }
        
        

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body as TUser
        const newUser = {
            id,
            name,
            email,
            password
        }
        if (newUser !== undefined) {
            if (!newUser.name || !newUser.password) {
                res.status(400)
                throw new Error("Nome ou senha faltando no cadastro")
            }
        }
        if (newUser !== undefined) {
            if (!newUser.id || !newUser.email) {
                res.status(400)
                throw new Error("Id ou email faltando no cadastro")
            }
        }

        const [ userId ] = await db.raw(`
        SELECT * FROM users
        WHERE id = ("${id}")
    `)

    if (userId) {
            res.status(404)
            throw new Error("Id ja cadastrado")
    }

    const [ userEmail ] = await db.raw(`
        SELECT * FROM users
        WHERE email = ("${email}")
    `)

    if (userEmail) {
            res.status(404)
            throw new Error("Email ja cadastrado")
    }
      
        await db.raw(`
            INSERT INTO users (id, name, email, password)
            VALUES ("${id}", "${name}", "${email}", "${password}")
        `)
        
    res.status(201).send('Usuario registrado com sucesso!')

} catch (error: any) {
    console.log(error)

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
})
app.post('/products', async (req: Request, res: Response) => {

    try {

        const { id, name, price, category } = req.body as TProduct
        const newProduct = {
            id,
            name,
            price,
            category
        }
        if (newProduct !== undefined) {
        if (!newProduct.id  || !newProduct.name|| !newProduct.category) {
            res.status(400)
            throw new Error("Informações faltando no cadastro de produtos")
        }

        if (newProduct.price < 1) {
            res.status(400)
            throw new Error("Preço faltando no cadastro de produtos")
        }}

        const [ searchId ] = await db.raw(`
					SELECT * FROM products
					WHERE id = "${id}";
				`) 

				if (searchId) {
					res.status(404)
					throw new Error("Id ja cadastrado")
				}


        await db.raw(`
            INSERT INTO products (id, name, price, category)
            VALUES ("${id}", "${name}", "${price}", "${category}")
        `)

        res.status(201).send('Produto registrado com sucesso!')

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if(!id || !name || !email || !password) {
            res.status(400)
            throw new Error("Dados inválidos")            
        }

        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string.")
        }

        if(typeof name !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo name.")
        }

        if(typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser do tipo string.")
        }

        if(typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser do tipo string.")
        }

         await db.raw(`
         INSERT INTO users (id, name, email, password)
         VALUES ("${id}", "${name}", "${email}", "${password}")
         `)

        const userId = Users.find((user) => user.id === id)

        if(userId) {
            res.status(409)
            throw new Error("'id' já cadastrado.")
        }

        const userEmail = Users.find((user) => user.email === email)

        if(userEmail) {
            res.status(409)
            throw new Error("'email' já cadastrado.")
        }

        const newUser = {
            id,
            name,
            email, 
            password
        }
        Users.push(newUser)
    
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
}
})
app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, category, description, image_url } = req.body

        if(!id || !name || !price || !category || !description || !image_url){
            res.status(404)
            throw new Error("Dados inválidos.")
        }

        await db.raw(`
         INSERT INTO products (id, name, price, category, description, image_url)
         VALUES ("${id}", "${name}", "${price}", "${category}", "${description}", "${image_url}" )
        `)

        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string.")
        }

        if(!name){
            res.status(404)
            throw new Error("'name' deve ser ser informado.")
        }        
        
        if(typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser do tipo string.")
        }       

        if(!price){
            res.status(404)
            throw new Error("'price' deve ser ser informado.")
        }

        if(typeof price !== "number") {
            res.status(400)
            throw new Error("'price' deve ser do tipo string.")
        }

        if(!category){
            res.status(404)
            throw new Error("'category' deve ser ser informado.")
        }
        
        if(typeof category !== "string") {
            res.status(400)
            throw new Error("'category' deve ser do tipo string.")
        }

        const productId = Products.find((product) => product.id === id)

        if(productId) {
            res.status(409)
            throw new Error("'id' já cadastrado.")
        }

        const newProduct: any = {
            id,
            name,
            price,
            category,
            description, 
            image_url
        }
        Products.push(newProduct)
    
        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = Products.find((product) => {
            return product.id === id
        })

        if(!result) {
            throw new Error("Produto não existe.")
        }
        res.status(200).send(result)
        console.log("Produto encontrado")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }    
})
//Get User Purchases by User id
app.get("/users/:id/purchase", async (req: Request, res: Response) => {


    try {
        const id = req.params.id
        const idUser = Users.find((user) => user.id === id)

        if (!idUser) {
            res.status(404)
            throw new Error("Usuario não existe")
        }
        const PurchaseidUser = Purchase.filter((p) => {
            return p.userId === idUser.id
        })
        if (!PurchaseidUser[0]) {
            res.status(201).send("Usuario não realizou nenhuma compra")
        } else {
            res.status(200).send(PurchaseidUser)
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})
app.delete("/users/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id as string

        const usersIndex = Users.findIndex((user) => {
            return user.id === id
        })
        console.log("Index:", usersIndex)

        if (usersIndex >= 0) {
            Users.splice(usersIndex, 1)
            res.status(200).send("User apagado com sucesso")
        } else {
            res.status(200).send("User não existe")

        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500) // definimos 500 porque é algo que o servidor não previu
        }

        res.send(error.message)
    }
})
app.delete("/products/:id", (req: Request, res: Response) => {

    try {

        const id = req.params.id as string
        const productById = Products.findIndex((product) => {
            return product.id === id
        })
        console.log("Index: ", productById)

        if (productById >= 0) {
            Products.splice(productById, 1)
            res.status(200).send("Produto apagado com sucesso")
        } else {
            res.status(404).send("Produto não existe")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500) // definimos 500 porque é algo que o servidor não previu
        }

        res.send(error.message)
    }


})


// //Edit User by id

app.put("/users/:id", (req: Request, res: Response) => {
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

        const user = Users.find((user) => {
            return user.id === id
        })
        if (user) {
            user.id = newId || user.id
            user.email = newEmail || user.email
            user.password = isNaN(newPassword) ? user.password : newPassword


            res.status(200).send("Cadastro atualizado com sucesso")
        } else {
            res.status(404).send("Id não encontrado")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Edit Product by id
app.put("/products/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const { name, price, category } = req.body as TProduct

        const searchIdProduct = Products.find((product) => {
            return product.id === id
        })
        if (!searchIdProduct) {
            res.status(400)
            throw new Error("Id não existe, insira uma id válida")
        }
        if (!price) {
            res.status(400)
            throw new Error("Digite um novo preço para o produto")
        }
        if (!category) {
            res.status(400)
            throw new Error("Digite uma nova categoria para o produto")
        }
        if (!name) {
            res.status(400)
            throw new Error("Digite um novo nome para o produto")
        }

        const product = Products.find((product) => {
            return product.id === id
        })

        if (product) {

            product.name = name || product.name
            product.price = isNaN(price) ? product.price : price
            product.category = category || product.category
        }
        res.status(200).send("Produto atualizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})