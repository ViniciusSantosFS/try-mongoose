import { Hero, ICrud } from './interfaces/InterfaceCrud'
import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize'
import { Sequelize as SequelizeType } from 'sequelize/types'

class Postgres implements ICrud {
  private driver!: SequelizeType
  private herois!: ModelCtor<Model<Hero, Hero>>

  constructor() {
    this.connect()
  }

  async read(item: { [key: string]: string }): Promise<Hero[]> {
    const heroes: unknown = await this.herois.findAll({ where: item, raw: true })
    return heroes as Hero[]
  }

  async update(id: number, item: Hero): Promise<number[]> {
    return await this.herois.update(item, { where: { id } })
  }

  async delete(id: number | undefined): Promise<number> {
    const heroId = id ? { id } : {}
    return await this.herois.destroy({ where: heroId })
  }

  async create(item: Hero): Promise<Hero> {
    const hero = await this.herois.create(item)
    return hero.get()
  }

  async connect(): Promise<void> {
    this.driver = new Sequelize(process.env.POSTGRES_URL || '', { quoteIdentifiers: false })
    await this.defineModel()
  }

  async defineModel(): Promise<void> {
    this.herois = this.driver.define(
      'herois',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },

        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        poder: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'tb_herois',
        freezeTableName: false,
        timestamps: false,
      }
    )

    await this.herois.sync()
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.driver.authenticate()
      return true
    } catch (error) {
      return false
    }
  }
}

export { Postgres }
