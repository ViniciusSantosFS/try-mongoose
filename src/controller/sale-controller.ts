import * as yup from 'yup'
import { Request, Response } from 'express'
import { Cpf } from '../utils/cpf-util'
import { saleService } from '../services/sale-sevice'

class SaleController {
  async create(req: Request, res: Response) {
    try {
      const schema = yup.object({
        buyerName: yup.string().required(),
        buyerCpf: yup.string().notRequired(),
        product: yup.string().required(),
        price: yup.number().required(),
        amount: yup.number().required(),
        sellerName: yup.string().required(),
        sellerCpf: yup
          .string()
          .required()
          .test('is-valid-cpf', 'CPF inválido', (cpf) => {
            if (!cpf) return false
            return new Cpf(cpf).isValid()
          }),
      })
      await schema.validate(req.body, { abortEarly: true })
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
