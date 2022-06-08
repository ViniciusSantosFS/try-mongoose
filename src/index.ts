import 'dotenv/config'
import './configs/database'

import { app } from './app'

const PORT = process.env.PORT || 3000
app.listen(PORT)
