import { ICrud } from '../interfaces/InterfaceCrud'

class ContextStrategy<T> {
  private database

  constructor(strategy: ICrud<T>) {
    this.database = strategy
  }

  create(item: T) {
    return this.database.create(item)
  }

  read(item: { [key: string]: string }, skip?: number, limit?: number) {
    return this.database.read(item, skip, limit)
  }

  update(id: number | string, item: T) {
    return this.database.update(id, item)
  }

  delete(id?: number | string) {
    return this.database.delete(id)
  }

  isConnected() {
    return this.database.isConnected()
  }
}

export { ContextStrategy }
