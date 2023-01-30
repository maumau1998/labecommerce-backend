import { TUser, TProduct, TPurchase, CATEGORY } from "./types";

export const Users: TUser[] = [{
   id: "u001",
   name: "mauricio",
   email: "mauricioleite85@gmail.com",
   password: "mauricio123"
},
{
   id: "u002",
   name: "astrodev",
   email: "astrodev85@gmail.com",
   password: "astrodev123"  
}]

export const Products: TProduct[] = [{
    id:"p001",
    name: "Jaca",
    price: 10,
    category: CATEGORY.FRUTA
},
{
    id:"p002",
    name: "Melancia",
    price: 30,
    category: CATEGORY.FRUTA
}]

export const Purchase: TPurchase[] = [{
    userId: "u001",
    productId: "p002",
    quantity: 5,
    totalPrice: 150
},
{
    userId: "u002",
    productId: "p001",
    quantity: 2,
    totalPrice: 20
}]

// função para users

export function createUser(id:string, name: string, email:string, password:string|number): TUser[]{
    const novoUsuario = {
        id: id,
        name: name,
        email: email,
        password: password
    }
    const newUser = [...Users, novoUsuario]
    console.log("Cadastro realizado com sucesso!")
    return newUser
    }    

 export function getAllUsers():TUser[]{
    return Users
    }

// função para produtos

 export function createProduct (id:string,  name:string, price:number, category:CATEGORY): TProduct[]{
        const novoProduto = {
            id, 
            name,
            price,
            category
        }
        const newProduct = [...Products, novoProduto]
    
        console.log("Produto criado com sucesso!")
        return newProduct
        }
        
 export function getAllProducts():TProduct[]{
        return Products
     }

// busca produto by id

export function getProductById(idToSearch: string): TProduct[] | undefined {
    return Products.filter((Products)=>{
        if(Products.id === idToSearch){
            return Products
        }
    })
}

// busca por nome

export function queryProductsByName(q: string): TProduct[] | undefined {
    return Products.filter((Products)=>{
        if(Products.name === q){
            return Products        
        }
    })
}  

// create purchase

export function createPurchase( userId:string, productId:string, quantity:number, totalPrice:number): TPurchase[]{
    const novaCompra = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    const newPurchase = [...Purchase, novaCompra]
    console.log("Compra realizada com sucesso!")
    return newPurchase
    }  


    export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] | undefined {
        return Purchase.filter((Purchase)=>{
            if(Purchase.userId === userIdToSearch){
                return Purchase
            
            }
        })
    }
