import mongoose, { Schema } from 'mongoose'

interface IProduct {
  name: string
  price: number
}

interface Item {
  product: IProduct
  amount: number
}

interface ISeller {
  name: string
  cpf: string
}

interface IBuyer {
  name: string
  cpf: string
}

export interface ISale {
  _id: string
  sale: {
    buyer: IBuyer
    item: Item
    seller: ISeller
    createdAt: Date
  }
}

const saleSchema = new Schema<Required<ISale>>({
  sale: {
    buyer: {
      name: String,
      cpf: String,
    },

    item: {
      product: {
        name: String,
        price: Number,
      },
      amount: Number,
    },

    seller: {
      name: String,
      cpf: String,
    },
    createdAt: Date,
  },
})

export const SaleModel = mongoose.model('Sale', saleSchema)
