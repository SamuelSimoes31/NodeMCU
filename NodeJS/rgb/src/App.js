import React from 'react';
import './App.css';

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      port: 'COM8',
      baud: 9600,
      red: 0,
      green: 0,
      blue: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    let obj = {}
    obj[e.target.id]=e.target.value
    this.setState(obj)
  }

  render(){
    return (
      <div className="App">
        <form name="serial" id="serial">
          <label for="port">Porta COM</label>
          <input type="text" name="port" id="port" value={this.state.port} onChange={this.handleChange}/><br/>
          <label for="baud">Baudrate</label>
          <input type="number" name="baud" id="baud" value={this.state.baud} onChange={this.handleChange}/><br/>
          <input type="submit" name="submit" value="OPEN" />
        </form>
        <div id="sliders">
          <div className="sliderDiv">
            <input className="slider" type="range" value={this.state.red} min="0" max="255" id="red" onInput={this.handleChange}/>
            <p id="redValue">{this.state.red}</p>
          </div>
          <div className="sliderDiv">
            <input className="slider" type="range" value={this.state.greeb} min="0" max="255" id="green" onInput={this.handleChange}/>
            <p id="greenValue">{this.state.green}</p>
          </div>
          <div className="sliderDiv">
            <input className="slider" type="range" value={this.state.blue} min="0" max="255" id="blue" onInput={this.handleChange}/>
            <p id="blueValue">{this.state.blue}</p>
          </div>
        </div>
        <div className="color" style={{backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`}}></div>
      </div>
    );
  }
}

export default App;
