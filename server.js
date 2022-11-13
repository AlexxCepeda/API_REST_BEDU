require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')


const app = express()
const port = 3000
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.get('/', (req, res) => {
    res.send('<h1>Mi api</h1>');
})

app.use('/api', require('./routes/index.js'))

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})