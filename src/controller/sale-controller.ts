import { NextFunction, Request, Response } from 'express'
import { saleService } from '../services/sale-sevice'
import { Yup } from '../providers/yup-provider'

class SaleController {
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      await Yup.saleSchema.validate(req.body, { abortEarly: true })
    } catch (error) {
      const { message } = error as Error
      return res.status(400).send({ message: message })
    }

    try {
      await saleService.create(req.body)
      return res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sales = (await saleService.list()) ?? []
      return res.status(200).json(sales)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      Yup.saleSchema.validate(req.body, { abortEarly: true })
    } catch (error) {
      return res.status(400).json({ message: error })
    }
    const { id } = req.params

    try {
      const sale = await saleService.update(id, req.body)
      if (!sale) return res.status(400).json({ message: 'sale is not register in database' })
      return res.status(200).json(sale)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      await saleService.delete(id)
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}

export const saleController = new SaleController()
