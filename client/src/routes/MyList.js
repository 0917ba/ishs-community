import React from 'react';
import TitleBigBang from '../layout/titleBigBang';

const MyList = () => {
  return (
    <>
    <TitleBigBang/>

      내 글 목록 입니다~

      <div className='empty'></div>
      <button>
      <a href="/Board"  style={{ color:'#797979' , textDecoration:'none' }} >이전</a>
      </button>
    </>
  );
};

export default MyList;