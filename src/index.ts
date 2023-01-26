import { Users, Products, Purchase } from "./database";
import { TUser, TProduct, TPurchase } from "./types";
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