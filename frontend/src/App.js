import React, { useRef, useState } from 'react';
import './styles/header.css';

import './App.css';
import WebcamApp from "./components/WebcamApp";
import OutputCode from "./components/Codeblock";
import Footer from "./components/Footer";

//change the OutputCode to call your file 
function App() {
  return (
    <div className='AppCol'>
      <h1 className="header-title">GenDev</h1>
      <div className='App'>
        <WebcamApp />
        <OutputCode />
      </div>
      <Footer />
    </div>
  );
}

export default App;

