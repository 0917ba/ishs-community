import React from 'react';
import {Link} from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <>
    
    <header className='header'>
      <a href="/Home" style={{ color:'#797979' , textDecoration:'none' }} >메인페이지 이동</a>
      &nbsp;&nbsp;<>|</>&nbsp;&nbsp;
      <a href="/MyList" style={{ color:'#797979' , textDecoration:'none' }}>내 글 목록</a>
    </header>

    </>
  );
};

export default Header;