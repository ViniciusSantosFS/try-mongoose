import mongoose from 'mongoose'

async function connect() {
  try {
    mongoose.connection.on('error', () => {
      throw new Error('Conexão com o banco de dados falhou')
    })

    if (!process.env.DATABASE_URL)
      throw new Error('Algo deu errado ao conectar com o banco de dados')
    mongoose.connect(process.env.DATABASE_URL)
  } catch (error) {
    throw new Error(error as string)
  }
}

connect()
