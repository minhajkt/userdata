import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {setupRoutes} from './routes/userRoutes'

const app = express()
dotenv.config()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/user', setupRoutes())

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
