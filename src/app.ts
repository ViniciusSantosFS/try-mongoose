import express, { ErrorRequestHandler } from 'express'

const app = express()
app.use(express.json())

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(500).end({ message: err.message })
}
app.use(errorHandler)

export { app }
