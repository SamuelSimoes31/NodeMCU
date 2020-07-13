import React, {useState, useEffect} from 'react';
import {useGeneralContext} from '../GeneralContext';

const SerialConnetion = (props) => {
  const {socket, portIsOn, setPortIsOn} = useGeneralContext()

  const [port,setPort] = useState('COM8')
  const [baud,setBaud] = useState(9600)
  const [portMessage,setPortMessage] = useState('Clique para abri a porta')

  useEffect(() => {
    console.log('useEffect Serial')
    socket.on('serialResponse', ({status,message}) => {
      console.log('portIsOn:',status)
      setPortIsOn(status)
      setPortMessage(message)
    })
    socket.on('disconnect', () => console.log('[IO] Disconnect => MORREU'))
    // return () => socket.off('serialResponse')
  },[socket,setPortIsOn])

  function handleSubmit(e){
    e.preventDefault()
    if(!portIsOn) socket.emit('serialRequest',{port,baud})
    else socket.emit('serialRequest',{})
  }

  return (
    <form name="serial" id="serial" onSubmit={handleSubmit} >
      <label >Porta COM</label>
      <input type="text" name="port" id="port" value={port} disabled={portIsOn?"disabled":""} onChange={e => setPort(e.target.value)}/><br/>
      <label >Baudrate</label>
      <input type="number" name="baud" id="baud" value={baud} disabled={portIsOn?"disabled":""} onChange={e => setBaud(e.target.value)}/><br/>
      <input type="submit" name="submit" value={portIsOn?'CLOSE':'OPEN'} />
      <p>{portMessage}</p>
    </form>
  );
}

export default SerialConnetion;
