import { Hero, ICrud } from '../interfaces/InterfaceCrud'

class ContextStrategy {
  private database

  constructor(strategy: ICrud) {
    this.database = strategy
  }

  create(item: Hero) {
    return this.database.create(item)
  }

  read(item: { [key: string]: string }) {
    return this.database.read(item)
  }

  update(id: number, item: Hero) {
    return this.database.update(id, item)
  }

  delete(id: number | undefined) {
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
