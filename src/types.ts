export type TUser = {
  id: string,
  name: string,
  email: string,
  password: string | number
}

export type TProduct = {
  id: string,
  name: string,
  price: number,
  category: CATEGORY
}

export type TPurchase = {
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number
}

export enum CATEGORY{
  FRUTA = "FRUTA",
  BEBIDA = "BEBIDA",
  PRODUTO = "PRODUTO"
}