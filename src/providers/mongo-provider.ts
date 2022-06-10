import mongoose, { Mongoose } from 'mongoose'

class MongoProvider {
  client: Mongoose | null = null

  async connect() {
    try {
      mongoose.connection.on('error', () => {
        throw new Error('Conexão com o banco de dados falhou')
      })
      mongoose.connection.on('connected', () => console.log('connection success'))

      if (!process.env.DATABASE_URL) {
        throw new Error('Algo deu errado ao conectar com o banco de dados')
      }

      this.client = await mongoose.connect(process.env.DATABASE_URL)
    } catch (error) {
      throw new Error(error as string)
    }
  }
}

new MongoProvider().connect()
