class NotImplementedException extends Error {
  constructor() {
    super('Not implemented Exception')
  }
}

export interface Hero {
  id?: number
  nome: string
  poder: string
}

interface ICrud {
  create(item: Hero): Promise<Hero>
  read(item: { [key: string]: string }): Promise<Hero[]>
  update(id: number, item: Hero): Promise<number[]>
  delete(id: number | undefined): Promise<number>
  connect(): Promise<void>
  isConnected(): Promise<boolean>
}

export { ICrud, NotImplementedException }
