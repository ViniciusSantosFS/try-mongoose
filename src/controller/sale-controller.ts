import { Request, Response } from 'express'
import { saleService } from '../services/sale-sevice'
import { Yup } from '../providers/yup-provider'

class SaleController {
  async create(req: Request, res: Response) {
    try {
      await Yup.saleSchema.validate(req.body, { abortEarly: true })
    } catch (error) {
      const { message } = error as Error
      return res.status(400).send({ message: message })
    }

    const success = await saleService.create(req.body)

    if (!success) {
      return res.status(500).json({ message: 'Something went wrong at register trade' })
    }
    return res.sendStatus(201)
  }
}

export const saleController = new SaleController()
