const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

const SerialPort = require('serialport')
let port=null;
let portIsOpen = null;
io.on('connection', socket => {
  console.log('[IO] Connection => Server has a new connection')
  
  // io.emit('serialResponse', (portIsOpen))

  socket.on('serialRequest', ({port: COMport,baud}) => {
    if(port===null || port.isOpen===false){ 
      port = new SerialPort(COMport,{baudRate:parseInt(baud)})
      
      port.on('open', () => {
        console.log('[SERIAL] Port is opened')
        portIsOpen = true;
        io.emit('serialResponse',true)
      })
      port.on('error', function(err) {
        console.log('Error: ', err.message)
        io.emit('serialResponse',false)
      })
  
      port.on('close', () => {
        console.log('[SERIAL] Port is closed')
        portIsOpen = false;
        io.emit('serialResponse',false)
      })
    }
    else if(COMport){
      console.log('AQUI e port.isOpen:',port.isOpen)
      io.emit('serialResponse', true)
    }
    else{
      port.close()
    }
  })

  socket.on('disconnect', () => {
    console.log('[SOCKET] Disconnect => A connection was disconnected')
    // if(port) port.close( err => console.log('[SERIAL] Porta fechada. Erro:',err))
    // else console.log('[SOCKET] Não foi possível fechar a SerialPort: ',port)
  })
})

server.listen(SERVER_PORT,SERVER_PORT, () => {
  console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
  console.log(`[HTTP] Listen => Press CTRL+C to stop it`)
})
