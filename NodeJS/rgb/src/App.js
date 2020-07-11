import React from 'react';
import './App.css';
import io from 'socket.io-client'

const socket = io('http://localhost:8080')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      port: 'COM8',
      baud: 9600,
      color: {
        red: 0,
        green: 0,
        blue: 0
      },
      portIsOn: null,
      portMessage: 'Clique para abri a porta'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
  }

  handleChange(e){
    let obj = {}
    obj[e.target.id]=e.target.value
    this.setState(obj)
  }

  handleColorChange(e){
    let color = this.state.color
    color[e.target.id]=parseInt(e.target.value)
    this.setState(color)
    socket.emit('color',{
      color: this.state.color
    })
  }

  handleSubmit(e){
    e.preventDefault()
    if(!this.state.portIsOn)
      socket.emit('serialRequest',{
        port: this.state.port,
        baud: this.state.baud
      })
    else
      socket.emit('serialRequest',{})
  }

  componentDidMount(){
    socket.on('serialResponse', ({status,message}) => {
      console.log('portIsOn:',status)
      this.setState({
        portIsOn: status,
        portMessage: message
      })
    })

    socket.on('disconnect', () => console.log('[IO] Disconnect => MORREU'))
  }

  render(){
    return (
      <div className="App">
        <form name="serial" id="serial" onSubmit={this.handleSubmit}>
          <label for="port">Porta COM</label>
          <input type="text" name="port" id="port" value={this.state.port} disabled={this.state.portIsOn?"disabled":""} onChange={this.handleChange}/><br/>
          <label for="baud">Baudrate</label>
          <input type="number" name="baud" id="baud" value={this.state.baud} disabled={this.state.portIsOn?"disabled":""} onChange={this.handleChange}/><br/>
          <input type="submit" name="submit" value={this.state.portIsOn?'CLOSE':'OPEN'} />
          <p>{this.state.portMessage}</p>
        </form>
        <div id="sliders">
          <div className="sliderDiv">
            <input className="slider" type="range" value={this.state.color.red} min="0" max="255" id="red" disabled={this.state.portIsOn?"":"disabled"} onChange={this.handleColorChange}/>
            <p id="redValue">{this.state.color.red}</p>
          </div>
          <div className="sliderDiv">
            <input className="slider" type="range" value={this.state.color.green} min="0" max="255" id="green" disabled={this.state.portIsOn?"":"disabled"} onChange={this.handleColorChange}/>
            <p id="greenValue">{this.state.color.green}</p>
          </div>
          <div className="sliderDiv">
            <input className="slider" type="range" value={this.state.color.blue} min="0" max="255" id="blue" disabled={this.state.portIsOn?"":"disabled"} onChange={this.handleColorChange}/>
            <p id="blueValue">{this.state.color.blue}</p>
          </div>
        </div>
        <div className="color" style={{backgroundColor: `rgb(${this.state.color.red},${this.state.color.green},${this.state.color.blue})`}}></div>
      </div>
    );
  }
}

export default App;
