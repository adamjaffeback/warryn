import React from 'react';
import robot from './robot.svg';
import './Warryn.css';

function Warryn ({message}) {
  return (
    <div className='Warryn'>
      <div className='Warryn-speech-bubble'>{message ? message : ''}</div>
      <img src={robot} alt="Warryn the Robot"/>
    </div>
  );
}

export default Warryn;
