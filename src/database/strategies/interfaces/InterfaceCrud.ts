class NotImplementedException extends Error {
  constructor() {
    super('Not implemented Exception')
  }
}

export interface Hero {
  _id?: string
  id?: number
  nome: string
  poder: string
}

interface ICrud<T> {
  create(item: T): Promise<T>
  read(item: { [key: string]: string }, skip?: number, limit?: number): Promise<T[]>
  update(id: number | string, item: T): Promise<number[]>
  delete(id?: number | string): Promise<number>
  isConnected(): Promise<boolean>
}

export { ICrud, NotImplementedException }
