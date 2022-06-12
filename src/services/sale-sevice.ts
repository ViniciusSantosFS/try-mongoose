import { ISale, SaleModel } from '../models/Sale'
import { SaleDto } from '../dtos/sale-dto'

interface ControllerSaleBody {
  buyerName: string
  buyerCpf: string
  product: string
  price: number
  amount: number
  sellerName: string
  sellerCpf: string
}

class SaleService {
  async create(sale: ControllerSaleBody) {
    const formattedSale = this.toModel(sale)
    const newSale = new SaleModel(formattedSale)
    await newSale.save()
    return true
  }

  async list() {
    const sales = await SaleModel.find({})
    if (!sales) return null
    const salesDto = sales.map((sale) => new SaleDto(sale))
    return salesDto
  }

  async update(id: string, sale: ControllerSaleBody) {
    const formattedSale = this.toModel(sale)
    const updatedSale = await SaleModel.findOneAndUpdate({ _id: id }, formattedSale, {
      new: true,
    })

    if (!updatedSale) return null
    return new SaleDto(updatedSale)
  }

  async delete(id: string) {
    await SaleModel.deleteOne({ _id: id })
  }

  private toModel(sale: ControllerSaleBody) {
    const { buyerName, buyerCpf, product, price, amount, sellerName, sellerCpf } = sale
    const formmatedSale = {
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
    return { sale: formmatedSale }
  }
}

export const saleService = new SaleService()
