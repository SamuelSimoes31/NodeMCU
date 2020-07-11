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
      buttonSerial: 'OPEN',
      // portIsOn: null
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
    color[e.target.id]=e.target.value
    this.setState(color)
    socket.emit('color',{
      color: this.state.color
    })
  }

  handleSubmit(e){
    e.preventDefault()
    if(this.state.buttonSerial === 'OPEN')
      socket.emit('serialRequest',{
        port: this.state.port,
        baud: this.state.baud
      })
    else
      socket.emit('serialRequest',{})
  }

  componentDidMount(){
    socket.on('serialResponse', portIsOn => {
      console.log('portIsOn:',portIsOn)
      // this.setState({portIsOn})
      if(portIsOn) {
        document.querySelectorAll('[portopen]').forEach(e => e.removeAttribute("disabled"))
        document.querySelectorAll('[portclosed]').forEach(e => e.setAttribute("disabled", "disabled"))
        this.setState({buttonSerial: 'CLOSE'})
      }
      else {
        document.querySelectorAll('[portopen]').forEach(e => e.setAttribute("disabled", "disabled"))
        document.querySelectorAll('[portclosed]').forEach(e => e.removeAttribute("disabled"))
        this.setState({buttonSerial: 'OPEN'})
      }
    })
  }

  render(){
    return (
      <div className="App">
        <form name="serial" id="serial" onSubmit={this.handleSubmit}>
          <label for="port">Porta COM</label>
          <input type="text" name="port" id="port" portclosed value={this.state.port} onChange={this.handleChange}/><br/>
          <label for="baud">Baudrate</label>
          <input type="number" name="baud" id="baud" portclosed value={this.state.baud} onChange={this.handleChange}/><br/>
          <input type="submit" name="submit" value={this.state.buttonSerial} />
        </form>
        <div id="sliders">
          <div className="sliderDiv">
            <input className="slider" type="range" value={this.state.color.red} min="0" max="255" id="red" portopen disabled onChange={this.handleColorChange}/>
            <p id="redValue">{this.state.color.red}</p>
          </div>
          <div className="sliderDiv">
            <input className="slider" type="range" value={this.state.color.green} min="0" max="255" id="green" portopen disabled onChange={this.handleColorChange}/>
            <p id="greenValue">{this.state.color.green}</p>
          </div>
          <div className="sliderDiv">
            <input className="slider" type="range" value={this.state.color.blue} min="0" max="255" id="blue" portopen disabled onChange={this.handleColorChange}/>
            <p id="blueValue">{this.state.color.blue}</p>
          </div>
        </div>
        <div className="color" style={{backgroundColor: `rgb(${this.state.color.red},${this.state.color.green},${this.state.color.blue})`}}></div>
      </div>
    );
  }
}

export default App;
