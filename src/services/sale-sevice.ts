import { SaleModel } from '../Models/Sale'

interface CreateParams {
  buyerName: string
  buyerCpf: string
  product: string
  price: number
  amount: number
  sellerName: string
  sellerCpf: string
}

class SaleService {
  async create(data: CreateParams) {
    const { buyerName, buyerCpf, product, price, amount, sellerName, sellerCpf } = data

    const sale = {
      buyer: {
        name: buyerName,
        cpf: buyerCpf ?? null,
      },

      item: {
        product: {
          name: product,
          price,
        },
        amount,
      },

      seller: {
        name: sellerName,
        cpf: sellerCpf,
      },

      createdAt: new Date(),
    }

    if (!SaleModel) return false

    const newSale = new SaleModel({ sale })

    try {
      await newSale.save()
    } catch (error) {
      return false
    }

    return true
  }
}

export const saleService = new SaleService()
