import React,{ useState, useEffect} from 'react';
import './App.css';
import io from 'socket.io-client'

const socket = io('http://localhost:8080')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

function App(props){
  const [port,setPort] = useState('COM8')
  const [baud,setBaud] = useState(9600)
  const [color,setColor] = useState({red:0, green:0, blue:0})
  const [portIsOn,setPortIsOn] = useState(null)
  const [portMessage,setPortMessage] = useState('Clique para abri a porta')

  useEffect(() => {
    socket.on('serialResponse', ({status,message}) => {
      console.log('portIsOn:',status)
      setPortIsOn(status)
      setPortMessage(message)
    })

    socket.on('disconnect', () => console.log('[IO] Disconnect => MORREU'))
  },[])

  function handleColorChange(e){
    console.log('color before:',color)
    let newColor = color
    newColor[e.target.id]=parseInt(e.target.value)
    setColor(newColor)
    console.log('color after:',color)
    socket.emit('color',color)
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!portIsOn) socket.emit('serialRequest',{port,baud})
    else socket.emit('serialRequest',{})
  }

  return (
    <div className="App">
      <form name="serial" id="serial" onSubmit={handleSubmit} >
        <label for="port">Porta COM</label>
        <input type="text" name="port" id="port" value={port} disabled={portIsOn?"disabled":""} onChange={e => setPort(e.target.value)}/><br/>
        <label for="baud">Baudrate</label>
        <input type="number" name="baud" id="baud" value={baud} disabled={portIsOn?"disabled":""} onChange={e => setBaud(e.target.value)}/><br/>
        <input type="submit" name="submit" value={portIsOn?'CLOSE':'OPEN'} />
        <p>{portMessage}</p>
      </form>
      <div id="sliders">
        <div className="sliderDiv">
          <input className="slider" type="range" value={color.red} min="0" max="255" id="red" disabled={portIsOn?"":"disabled"} onChange={handleColorChange}/>
          <p id="redValue">{color.red}</p>
        </div>
        <div className="sliderDiv">
          <input className="slider" type="range" value={color.green} min="0" max="255" id="green" disabled={portIsOn?"":"disabled"} onChange={handleColorChange}/>
          <p id="greenValue">{color.green}</p>
        </div>
        <div className="sliderDiv">
          <input className="slider" type="range" value={color.blue} min="0" max="255" id="blue" disabled={portIsOn?"":"disabled"} onChange={handleColorChange}/>
          <p id="blueValue">{color.blue}</p>
        </div>
      </div>
      <div className="color" style={{backgroundColor: `rgb(${color.red},${color.green},${color.blue})`}}></div>
    </div>
  );
}

export default App;
