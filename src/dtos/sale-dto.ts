import { ISale } from '../models/Sale'

class SaleDto {
  _id
  buyer
  item
  seller

  constructor(saleDocumment: ISale) {
    const { sale } = saleDocumment
    this._id = saleDocumment._id
    this.buyer = sale.buyer
    this.item = sale.item
    this.seller = sale.seller
  }
}

export { SaleDto }
