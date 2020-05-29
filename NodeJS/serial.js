const SerialPort = require('serialport')
// const Readline = require('@serialport/parser-readline')
// const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
let port = null

this.open = function(port,baud=9600){
  this.port = new SerialPort(port,{baudRate: Number.parseInt(baud)}, err => {
    err && console.log('erro ao criar porta: ',err)
  })
}

this.close = function() {
  this.port.close()
}

this.isOpen = function() {
  if(this.port) return this.port.isOpen
  return false
}

// parser.on('data', function (data) {
//   console.log('parser.on:', data)
// })

this.write = msg => this.port.write(msg, err => {
    if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('enviado:',msg)
})
