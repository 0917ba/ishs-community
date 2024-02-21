import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function FindPw() {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState('');

  const onClickMain = () => {
    navigate('/main');
  };

  const onChangeId = (e) => {
    setInputId(e.target.value);
  };

  const Find = () => {
    const formData = {
      mgitethod: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: inputId,
      }),
    };

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    //const res = await fetch(`serverUrl` + `/findpw`, formData);
    const status = res.status;
    const getMessage = res.message;
  };
  return (
    <div>
      <label htmlFor='input_id'>아이디를 입력해주세요. </label>
      <br></br>
      <input
        type='text'
        name='input_id'
        value={inputId}
        onChange={onChangeId}
      />

      <button onClick={Find}>비밀번호 찾기</button>

      <br></br>
      <p>{inputId}</p>
      <button onClick={onClickMain}>홈화면으로 가기</button>

      <h1>아직 구현되지 않은 기능입니다.</h1>
    </div>
  );
}

export default FindPw;
