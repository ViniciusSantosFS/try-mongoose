import { Hero, ICrud, NotImplementedException } from './interfaces/InterfaceCrud'

class MongoDB implements ICrud {
  create(item: Hero): Promise<Hero> {
    throw new NotImplementedException()
  }
  read(item: { [key: string]: string }): Promise<Hero[]> {
    throw new NotImplementedException()
  }
  update(id: number, item: Hero): Promise<number[]> {
    throw new NotImplementedException()
  }
  delete(id: number | undefined): Promise<number> {
    throw new NotImplementedException()
  }
  connect(): Promise<void> {
    throw new NotImplementedException()
  }

  async isConnected(): Promise<boolean> {
    return false
  }
}

export { MongoDB }
