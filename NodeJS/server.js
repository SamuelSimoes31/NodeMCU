const express = require('express')
const app = express()

const serial = require('./serial')

app.use(express.static('.'))

app.get('/teste', (req,res) => {
    console.log(req.query.string)
    res.send(req.query.string)
})

const colors = {
    red: 0,
    green: 0,
    blue: 0
}

app.get('/rgb',(req,res) => {
    console.log(req.query.color,req.query.value)
    
    colors[`${req.query.color}`] = req.query.value
    res.send(colors)
    const buf = Buffer.from([colors.red,colors.green,colors.blue])
    // console.log(buf)
    serial.writeString(buf)
})

app.listen(8080, () => console.log('Executando na porta 8080...'))