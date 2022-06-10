import 'dotenv/config'
import './providers/mongo-provider'

import { app } from './app'

const PORT = process.env.PORT || 3000
app.listen(PORT)
