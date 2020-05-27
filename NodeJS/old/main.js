const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const Delimiter = require('@serialport/parser-delimiter')
const port = new SerialPort('COM8',{baudRate: 9600})
const parser = port.pipe(new Readline({delimiter:'\r\n'}))
// const parser = port.pipe(new Delimiter({ delimiter: '\n' }))

// Read data that is available but keep the stream in "paused mode"
// port.on('readable', function () {
//     console.log('Data:', port.read())
//   })

// Switches the port into "flowing mode"
port.on('data', function (data) {
  console.log('port.on:', data)
})

function convertToByte(){
  let arr = []
  for(let x of arguments){
    arr.push(x)
  }
  return new Buffer(arr)
}

var buffer = new Buffer(3);
buffer[0] = 0xff;
buffer[1] = 0x00;
buffer[2] = 0x00;

port.write(buffer)



parser.on('data', function (data) {
  console.log('parser.on:', data)
})
  
// // Pipe the data into another stream (like a parser or standard out)
// const lineStream = port.pipe(new Readline())