import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './signin.module.css';
import logo from '../../component/img/log_ishs_image.png';

function Signin() {
  /*
  useEffect(() => {
    (async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const res = await fetch(serverUrl + `/check_session?`);
      console.log(res);
    })();
  }, []);
  */

  const navigate = useNavigate();
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const [message, setMessage] = useState('');

  const onChangeId = (e) => {
    setInputId(e.target.value);
  };

  const onChangePw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickSignUp = () => {
    navigate('/register');
  };

  const onClickSignin = async () => {
    //console.log(inputId, inputPw);
    console.log('signin');

    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        id: inputId,
        password: inputPw,
      }),
    };

    const resl = await fetch(`/signin`, formData);
    console.log(resl);

    const status = resl.status;

    if (status === 200) {
      navigate('/');
    }
    if (status === 400) {
      setMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
    if (status === 500) {
      navigate('/developer/special');
    }
  };

  const onClickForgetPW = () => {
    navigate('/findpw');
  };

  const onKeyDownSignin = (e) => {
    if (e.key === 'Enter') {
      console.log('enter');
      onClickSignin();
    }
  };

  const onClickToMain = () => {
    navigate('/');
  };

  return (
    <div className={styles.all}>
      <div>
        <img className={styles.logo} src={logo} onClick={onClickToMain} />
      </div>
      <div className={styles.modal}></div>
      <div className={styles.font}>Login</div>
      <div>
        {/* <label htmlFor='input_id'>ID | </label> */}
        <input
          placeholder='ID'
          type='text'
          name='input_id'
          value={inputId}
          onChange={onChangeId}
          className={styles.input}
        />
      </div>
      <div>
        {/* <label htmlFor='input_pw'>PW | </label> */}
        <input
          placeholder='Password'
          type='password'
          name='input_pw'
          value={inputPw}
          onChange={onChangePw}
          className={styles.input2}
          onKeyDown={onKeyDownSignin}
        />
      </div>
      <div>
        <p>{message}</p>
      </div>
      <div>
        <span>
          <button
            type='button'
            onClick={onClickForgetPW}
            className={styles.forgetpw}
          >
            비밀번호를 잊으셨나요?
          </button>
        </span>
        <span>
          <button
            type='button'
            onClick={onClickSignUp}
            className={styles.signup}
          >
            회원가입
          </button>
        </span>
      </div>

      <div>
        <button type='button' onClick={onClickSignin} className={styles.signin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Signin;
