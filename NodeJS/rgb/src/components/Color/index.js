import React, {useState, useEffect} from 'react';
import {useGeneralContext} from '../GeneralContext';
import './style.css'

const PickColor = () => {
  const {socket, portIsOn} = useGeneralContext()
  const [color,setColor] = useState({red:0, green:0, blue:0})

  useEffect(() => {
    socket.emit('color',color)
  },[color,socket])

  function handleColorChange(e){
    setColor({
      ...color,
      [e.target.id]: parseInt(e.target.value)
    })
  }

  return (
    <>
      <div id="sliders" disabled={portIsOn?"":"disabled"}>
        <div className="sliderDiv">
          <input className="slider" type="range" value={color.red} min="0" max="255" id="red" onChange={handleColorChange}/>
          <p id="redValue">{color.red}</p>
        </div>
        <div className="sliderDiv">
          <input className="slider" type="range" value={color.green} min="0" max="255" id="green" onChange={handleColorChange}/>
          <p id="greenValue">{color.green}</p>
        </div>
        <div className="sliderDiv">
          <input className="slider" type="range" value={color.blue} min="0" max="255" id="blue" onChange={handleColorChange}/>
          <p id="blueValue">{color.blue}</p>
        </div>
      </div>
      <div className="color" style={{backgroundColor: `rgb(${color.red},${color.green},${color.blue})`}}></div>
    </>
  );
}

export default PickColor;
