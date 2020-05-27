const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM8',{baudRate: 9600})
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

parser.on('data', function (data) {
  console.log('parser.on:', data)
})

writeString = str => port.write(str, err => {
    if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('message written')
})

module.exports = {
  writeString
}