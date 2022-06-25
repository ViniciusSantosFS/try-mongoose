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

interface ICrud {
  create(item: Hero): Promise<Hero>
  read(item: { [key: string]: string }, skip?: number, limit?: number): Promise<Hero[]>
  update(id: number | string, item: Hero): Promise<number[]>
  delete(id?: number | string): Promise<number>
  connect(): Promise<void>
  isConnected(): Promise<boolean>
}

export { ICrud, NotImplementedException }
