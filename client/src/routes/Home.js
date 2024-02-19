import React from 'react';
import Route from "react-router-dom";

const Home = () => {
  return (
    <div>
    <div className='empty'></div>
    <div className='empty'></div>
    메인페이지 띄우기
    <div className='empty'></div>
    
      <button>
      <a href="/Board"  style={{ color:'#797979' , textDecoration:'none' }} >이전</a>
      </button>
    </div>
  
  );
};

export default Home;