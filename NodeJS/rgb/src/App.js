import React from 'react';
import './App.css';
import GenerealContextProvider from './components/GeneralContext';
import Serial from './components/Serial';
import Color from './components/Color';

function App(props){

  return (
    <div className="App">
    <GenerealContextProvider>
      <Serial/>
      <Color/>
    </GenerealContextProvider>
    </div>
  );
}

export default App;
