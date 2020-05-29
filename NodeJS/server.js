const express = require('express')
const path = require('path')
const serial = require('./serial')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html',require('ejs').renderFile)
app.set('view engine','html')

app.use('/', (req,res) => {
    res.render('index.html')
})

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.on('serial',({port,baud}) => {
        if(serial.isOpen()) serial.close()
        else serial.open(port,baud)
        setTimeout(()=>{
            console.log('porta aberta?:',serial.isOpen())
            io.emit('serialState',serial.isOpen())
        },50)
    })

    socket.on('color',(colors)=>{
        const buf = Buffer.from([colors.red,colors.green,colors.blue])
        serial.write(buf)
    })
})

server.listen(8080,() => console.log('Executando na porta 8080...'))