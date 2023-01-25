import { TUser, TProduct, TPurchase } from "./types";

export const Users: TUser[] = [{
   id: "u001",
   email: "mauricioleite85@gmail.com",
   password: "mauricio123"
},
{
   id: "u002",
   email: "astrodev85@gmail.com",
   password: "astrodev123"  
}]

export const Products: TProduct[] = [{
    id:"p001",
    name: "Jaca",
    price: 10,
    category: "fruta"
},
{
    id:"p002",
    name: "Melancia",
    price: 30,
    category: "fruta"
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