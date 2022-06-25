import 'dotenv/config'
import assert from 'assert'
import { MongoDB } from '../database/strategies/mongodb/mongodb'
import { ContextStrategy } from '../database/strategies/base/contextStrategy'
import heroesSchema from '../database/strategies/mongodb/schemas/heroesSchema'
import mongoose from 'mongoose'
import { Hero, ICrud } from '../database/strategies/interfaces/InterfaceCrud'

const MOCK_CREATE_HERO = {
  nome: 'Mulher Maravilha',
  poder: 'Laço',
}

const MOCK_DEFAULT_HERO = {
  nome: `Homem Aranha-${Date.now()}`,
  poder: 'Super teia',
}

const MOCK_HERO_TO_UPDATE = {
  nome: `Patolino`,
  poder: 'Velocidade',
}

let MOCK_HERO_ID: string | undefined
let contextStrategy: ICrud<Hero> | undefined

describe.only('MongoDb Suit tests', function () {
  this.timeout(Infinity)

  this.beforeAll(async () => {
    const connection = await MongoDB.connect()
    contextStrategy = new ContextStrategy(new MongoDB(connection, heroesSchema))
    await contextStrategy.create(MOCK_DEFAULT_HERO)
    const hero = await contextStrategy.create(MOCK_HERO_TO_UPDATE)
    MOCK_HERO_ID = hero._id
  })

  this.afterAll(async () => {
    await mongoose.disconnect()
  })

  it('Should verify connection', async () => {
    const result = await contextStrategy?.isConnected()

    assert.deepStrictEqual(result, true)
  })

  it('Should create a hero', async () => {
    const { nome, poder } = await contextStrategy!.create(MOCK_CREATE_HERO)
    assert.deepStrictEqual({ nome, poder }, MOCK_CREATE_HERO)
  })

  it('Should list heroes', async () => {
    const [{ nome, poder }] = await contextStrategy!.read({ nome: MOCK_DEFAULT_HERO.nome })
    assert.deepStrictEqual({ nome, poder }, MOCK_DEFAULT_HERO)
  })

  it('Should update a hero', async () => {
    const [result] = await contextStrategy!.update(MOCK_HERO_ID!, {
      ...MOCK_HERO_TO_UPDATE,
      nome: 'Pernalonga',
    })
    assert.deepStrictEqual(result, 1)
  })

  it('Should remove a hero', async () => {
    const result = await contextStrategy!.delete(MOCK_HERO_ID)
    assert.deepStrictEqual(result, 1)
  })
})
