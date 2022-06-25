import mongoose from 'mongoose'
import { Hero } from '../../interfaces/InterfaceCrud'

const heroSchema = new mongoose.Schema<Hero>({
  nome: {
    type: String,
    required: true,
  },

  poder: {
    type: String,
    required: true,
  },
})

export default mongoose.model<Hero>('hero', heroSchema)
