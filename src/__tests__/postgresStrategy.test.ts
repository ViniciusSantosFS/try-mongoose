import 'dotenv/config'
import assert from 'assert'
import { Postgres } from '../database/strategies/postgres'
import { ContextStrategy } from '../database/strategies/base/contextStrategy'

const contextStrategy = new ContextStrategy(new Postgres())

const MOCK_HEROI = {
  nome: 'Gavião Negro',
  poder: 'Flexas',
}

const MOCK_HEROI_UPDATE = {
  nome: 'Batman',
  poder: 'Dinheiro',
}

describe('Postgres Strategy', function () {
  this.timeout(Infinity)

  this.beforeAll(async () => {
    // await contextStrategy.connect()
    await contextStrategy.delete(undefined)
    await contextStrategy.create(MOCK_HEROI_UPDATE)
  })

  it('Should connect with PostgresSQL', async () => {
    const result = await contextStrategy.isConnected()
    assert.equal(result, true)
  })

  it('Should create a hero', async () => {
    const result = await contextStrategy.create(MOCK_HEROI)
    delete result.id

    assert.deepEqual(result, MOCK_HEROI)
  })

  it('Should list heroes', async () => {
    const [result] = await contextStrategy.read({ nome: MOCK_HEROI.nome })
    delete result.id
    assert.deepEqual(result, MOCK_HEROI)
  })

  it('Should update a hero', async () => {
    const [heroToUpdate] = await contextStrategy.read({ nome: MOCK_HEROI_UPDATE.nome })

    const newMockHero = {
      ...MOCK_HEROI_UPDATE,
      nome: 'Mulher Maravilha',
    }

    const [result] = await contextStrategy.update(heroToUpdate.id!, newMockHero)
    const [updatedHero] = await contextStrategy.read({ id: heroToUpdate.id!.toString() })

    assert.deepEqual(result, 1)
    assert.deepEqual(updatedHero.nome, newMockHero.nome)
  })

  it('Should remove a hero', async () => {
    const [hero] = await contextStrategy.read({})
    const result = await contextStrategy.delete(hero.id)

    assert.deepEqual(result, 1)
  })
})
