const SerialPort = require('serialport')
const port = new SerialPort('COM8',{baudRate: 9600})

//LEITURA
const Readline = require('@serialport/parser-readline')
const parser = port.pipe(new Readline({delimiter:'\r\n'}))

// Switches the port into "flowing mode"
port.on('data', function (data) {
  console.log('port.on:', data)
})

parser.on('data', function (data) {
  console.log('parser.on:', data)
  io.emit('dadoNodeMCU', {
    valor: data
  })
})

//SERVER
let app = require('express')()
let express = require('express')

app.use(express.static(__dirname + '/public'))

let http = require('http').Server(app)

let io = require('socket.io')(http)

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})

let mySocket

io.on('connection', socket => {
  console.log('Um usuário está conectado!')
})

http.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})