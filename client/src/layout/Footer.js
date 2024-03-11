import React from 'react';
import './Footer.css';
import img from '../component/img/exPic.png';
const Footer = () => {
  return (
    <>
      <div className='empty'></div>

      <div className='footer'>
        <img className='exPic' alt='exPic' src={img}></img>
        <img className='exPic' alt='exPic' src={img}></img>
        <img className='exPic' alt='exPic' src={img}></img>
      </div>
    </>
  );
};

export default Footer;
