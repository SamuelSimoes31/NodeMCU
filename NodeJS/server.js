const express = require('express')
const app = express()

const serial = require('./serial')

app.use(express.static('.'))

app.get('/teste', (req,res) => {
    console.log(req.query.string)
    res.send(req.query.string)
})

app.get('/rgb',(req,res) => {
    console.log(req.query.color,req.query.value)
    serial.writeString(`${req.query.color} ${req.query.value}\r\n`)
    res.end()
})

app.listen(8080, () => console.log('Executando na porta 8080...'))