import express, { ErrorRequestHandler } from 'express'
import { saleController } from './controller/sale-controller'

const app = express()
app.use(express.json())

app.post('/sale', saleController.create)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(500).end({ message: err.message })
}
app.use(errorHandler)

export { app }
