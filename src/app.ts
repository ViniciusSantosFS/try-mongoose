import express, { ErrorRequestHandler } from 'express'
import { saleController } from './controller/sale-controller'

const app = express()
app.use(express.json())

app.get('/sales', saleController.index)
app.post('/sales', saleController.store)
app.put('/sales/:id', saleController.update)
app.delete('/sales/:id', saleController.destroy)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(500).json({ message: err.message })
}
app.use(errorHandler)

export { app }
