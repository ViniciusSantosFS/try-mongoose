import { ICrud } from '../interfaces/InterfaceCrud'
import mongoose from 'mongoose'

class MongoDB<MongoSchema> implements ICrud<MongoSchema> {
  private connection: mongoose.Connection
  private schema: mongoose.Model<MongoSchema>

  constructor(connection: mongoose.Connection, schema: mongoose.Model<MongoSchema>) {
    this.schema = schema
    this.connection = connection
  }

  async create(item: MongoSchema): Promise<any> {
    return await this.schema.create(item)
  }

  async read(item: { [key: string]: string }, skip = 0, limit = 10): Promise<MongoSchema[]> {
    //@ts-expect-error
    return await this.schema.find(item).skip(skip).limit(limit)
  }

  async update(id: string, item: MongoSchema): Promise<number[]> {
    //@ts-expect-error
    const result = await this.schema.updateOne({ _id: id }, { $set: item })
    return [result.modifiedCount]
  }

  async delete(id?: number | string): Promise<number> {
    //@ts-expect-error
    const success = await this.schema.deleteOne({ _id: id })
    return success.deletedCount
  }

  static async connect(): Promise<mongoose.Connection> {
    await mongoose.connect(process.env.MONGO_DB_URL || '')
    return mongoose.connection
  }

  async isConnected(): Promise<boolean> {
    return this.connection !== null
  }
}

export { MongoDB }
