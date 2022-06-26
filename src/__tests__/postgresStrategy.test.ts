import 'dotenv/config'
import assert from 'assert'
import { Postgres } from '../database/strategies/postgres/postgres'
import { ContextStrategy } from '../database/strategies/base/contextStrategy'
import { heroesSchema } from '../database/strategies/postgres/schemas/heroesSchema'
import { Model, ModelCtor } from 'sequelize'
import { Hero, ICrud } from '../database/strategies/interfaces/InterfaceCrud'

const MOCK_HERO = {
  nome: 'Gavião Negro',
  poder: 'Flexas',
}

const MOCK_HERO_UPDATE = {
  nome: 'Batman',
  poder: 'Dinheiro',
}

let contextStrategy: ICrud<Hero> | undefined

describe('Postgres Strategy', function () {
  this.timeout(Infinity)

  this.beforeAll(async () => {
    const connection = Postgres.connect()
    const schema = await Postgres.defineModel(connection, heroesSchema)
    contextStrategy = new ContextStrategy(
      new Postgres<Hero>(connection, schema as ModelCtor<Model<Hero, Hero>>)
    )

    await contextStrategy.delete(undefined)
    await contextStrategy.create(MOCK_HERO_UPDATE)
  })

  it('Should connect with PostgresSQL', async () => {
    const result = await contextStrategy!.isConnected()
    assert.equal(result, true)
  })

  it('Should create a hero', async () => {
    const result = await contextStrategy!.create(MOCK_HERO)
    delete result.id

    assert.deepEqual(result, MOCK_HERO)
  })

  it('Should list heroes', async () => {
    const [result] = await contextStrategy!.read({ nome: MOCK_HERO.nome })
    delete result.id
    assert.deepEqual(result, MOCK_HERO)
  })

  it('Should update a hero', async () => {
    const [heroToUpdate] = await contextStrategy!.read({ nome: MOCK_HERO_UPDATE.nome })

    const newMockHero = {
      ...MOCK_HERO_UPDATE,
      nome: 'Mulher Maravilha',
    }

    const [result] = await contextStrategy!.update(heroToUpdate.id!, newMockHero)
    const [updatedHero] = await contextStrategy!.read({ id: heroToUpdate.id!.toString() })

    assert.deepEqual(result, 1)
    assert.deepEqual(updatedHero.nome, newMockHero.nome)
  })

  it('Should remove a hero', async () => {
    const [hero] = await contextStrategy!.read({})
    const result = await contextStrategy!.delete(hero.id)

    assert.deepEqual(result, 1)
  })
})
