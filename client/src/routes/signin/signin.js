import { useEffect, useState } from 'react';
import styles from './signin.module.css';

function Signin() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const onChangeId = (e) => {
    setInputId(e.target.value);
  };

  const onChangePw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickSignin = async () => {
    //console.log(inputId, inputPw);
    console.log('signin');
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: inputId,
        password: inputPw,
      }),
    };

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const res = await fetch(`serverUrl`, formData);
    const status = res.status;
    //const data = await res.json();
  };

  useEffect = (() => {}, []);

  return (
    <div>
      <div>
        <label htmlFor='input_id'>ID | </label>
        <input
          type='text'
          name='input_id'
          value={inputId}
          onChange={onChangeId}
        />
      </div>
      <div>
        <label htmlFor='input_pw'>PW | </label>
        <input
          type='password'
          name='input_pw'
          value={inputPw}
          onChange={onChangePw}
        />
      </div>
      <div>
        <button type='button' onClick={onClickSignin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Signin;
