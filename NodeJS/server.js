const express = require('express')
const app = express()

app.use(express.static('.'))

app.get('/teste', (req,res) => {
    console.log(req.query.string)
    res.send(req.query.string)
})

app.listen(8080, () => console.log('Executando na porta 8080...'))