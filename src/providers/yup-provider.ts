import * as yup from 'yup'
import { Cpf } from '../utils/cpf-util'

class Yup {
  static saleSchema = yup.object({
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
}

export { Yup }
