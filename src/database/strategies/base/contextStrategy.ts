import { Hero, ICrud } from '../interfaces/InterfaceCrud'

class ContextStrategy {
  private database

  constructor(strategy: ICrud) {
    this.database = strategy
  }

  create(item: Hero) {
    return this.database.create(item)
  }

  read(item: { [key: string]: string }, skip?: number, limit?: number) {
    return this.database.read(item, skip, limit)
  }

  update(id: number | string, item: Hero) {
    return this.database.update(id, item)
  }

  delete(id?: number | string) {
    return this.database.delete(id)
  }

  connect() {
    return this.database.connect()
  }

  isConnected() {
    return this.database.isConnected()
  }
}

export { ContextStrategy }
