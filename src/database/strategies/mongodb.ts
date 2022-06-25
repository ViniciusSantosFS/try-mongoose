import { Hero, ICrud } from './interfaces/InterfaceCrud'
import mongoose from 'mongoose'

class MongoDB implements ICrud {
  private connection: mongoose.Connection | null = null
  private herois!: mongoose.Model<Hero>

  async create(item: Hero): Promise<Hero> {
    return await this.herois.create(item)
  }

  async read(item: { [key: string]: string }, skip = 0, limit = 10): Promise<Hero[]> {
    return await this.herois.find(item).skip(skip).limit(limit)
  }

  async update(id: string, item: Hero): Promise<number[]> {
    const result = await this.herois.updateOne({ _id: id }, { $set: item })
    return [result.modifiedCount]
  }

  async delete(id?: number | string): Promise<number> {
    const success = await this.herois.deleteOne({ _id: id })
    return success.deletedCount
  }

  async connect(): Promise<void> {
    await mongoose.connect(process.env.MONGO_DB_URL || '')
    this.connection = mongoose.connection
    this.defineModel()
  }

  defineModel() {
    const heroSchema = new mongoose.Schema<Hero>({
      nome: {
        type: String,
        required: true,
      },

      poder: {
        type: String,
        required: true,
      },
    })

    this.herois = mongoose.model<Hero>('hero', heroSchema)
  }

  async isConnected(): Promise<boolean> {
    return this.connection !== null
  }
}

export { MongoDB }
