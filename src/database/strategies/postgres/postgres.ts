import { ICrud } from '../interfaces/InterfaceCrud'
import { Model, ModelCtor, Sequelize, WhereOptions } from 'sequelize'
import { Sequelize as SequelizeType } from 'sequelize/types'

class Postgres<Schema> implements ICrud<Schema> {
  private connection!: SequelizeType
  private schema!: ModelCtor<Model<Schema, Schema>>

  constructor(connection: SequelizeType, schema: ModelCtor<Model<Schema, Schema>>) {
    this.connection = connection
    this.schema = schema
  }

  async read(item: { [key: string]: string }): Promise<Schema[]> {
    //@ts-expect-error
    const heroes: unknown = await this.schema.findAll({ where: item, raw: true })
    return heroes as Schema[]
  }

  async update(id: number, item: Schema): Promise<number[]> {
    //@ts-ignore
    return await this.schema.update(item, { where: { id } })
  }

  async delete(id?: number): Promise<number> {
    const heroId: unknown = id ? { id } : {}
    return await this.schema.destroy({ where: heroId as WhereOptions<Schema> })
  }

  async create(item: Schema): Promise<Schema> {
    //@ts-ignore
    const hero = await this.schema.create(item)
    return hero.get()
  }

  static connect(): SequelizeType {
    const connection = new Sequelize(process.env.POSTGRES_URL || '', { quoteIdentifiers: false })
    return connection
  }

  static async defineModel<T>(
    connection: SequelizeType,
    schema: any
  ): Promise<ModelCtor<Model<T, T>>> {
    const model = connection.define(schema.name, schema.schema, schema.options)
    await model.sync()
    return model
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.connection.authenticate()
      return true
    } catch (error) {
      return false
    }
  }
}

export { Postgres }
