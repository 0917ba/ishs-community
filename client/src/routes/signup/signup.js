import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css';

function Signup() {
  const navigate = useNavigate();
  const [PWmessage, setPWMessage] = useState('');
  const [message, setMessage] = useState('');

  const [inputKey, setInputKey] = useState('');
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword_check, setInputPassword_check] = useState('');
  const [inputIdentify_code, setInputIdentify_code] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setName] = useState('');
  const [inputNickname, setInputNickname] = useState('');
  const [inputBirthday, setInputBirthday] = useState('');

  const onChangeKey = (e) => {
    setInputKey(e.target.value);
  };

  const onChangeId = (e) => {
    setInputId(e.target.value);
  };

  const onChangePassword = (e) => {
    setInputPassword(e.target.value);
  };

  const onChangePassword_check = (e) => {
    setInputPassword_check(e.target.value);
  };

  const onChangeIdentify_code = (e) => {
    setInputIdentify_code(e.target.value);
  };

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setInputNickname(e.target.value);
  };

  const onChangeBirthday = (e) => {
    setInputBirthday(e.target.value);
  };

  const onClickSignup = async () => {
    //console.log('signup');

    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: inputKey,
        id: inputId,
        password: inputPassword,
        identify_code: inputIdentify_code,
        email: inputEmail,
        name: inputName,
        nickname: inputNickname,
        birthday: inputBirthday,
      }),
    };

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const res = await fetch(`serverUrl`, formData);
    const status = res.status;
    const getMessage = res.message;

    if (status === 200) {
      navigate('/signup/success');
    }
    if (status === 400) {
      setMessage(getMessage);
    }
    if (status === 500) {
      navigate('/developer/special');
    }
    //const data = await res.json();
  };

  const DataCheck = () => {
    if (
      inputId === '' ||
      inputPassword === '' ||
      inputIdentify_code === '' ||
      inputEmail === '' ||
      inputName === '' ||
      inputNickname === ''
    ) {
      return true;
    }
    if (inputPassword !== inputPassword_check) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (inputPassword_check !== inputPassword) {
      setPWMessage('비밀번호가 일치하지 않습니다.');
    } else setPWMessage('비밀번호가 일치합니다.');
  }, [inputPassword, inputPassword_check]);
  return (
    <div>
      <div>
        <label>학번 | </label>
        <input
          type='text'
          name='학번'
          placeholder='0000'
          value={inputKey}
          onChange={onChangeKey}
          pattern='[1-3]{1}[0-9]{3}'
        />
      </div>
      <div>
        <label>아이디 | </label>
        <input
          type='text'
          name='아이디'
          placeholder='아이디를 입력해 주세요.'
          value={inputId}
          onChange={onChangeId}
        />
      </div>
      <div>
        <span>
          <label>비밀번호 | </label>
          <input
            type='password'
            name='비밀번호'
            placeholder='비밀번호를 입력해 주세요.'
            value={inputPassword}
            onChange={onChangePassword}
          />
        </span>
        <span>
          <p>{PWmessage}</p>
        </span>
      </div>
      <div>
        <label>비밀번호 확인 | </label>
        <input
          type='password'
          name='비밀번호 확인'
          placeholder='비밀번호를 다시 입력해 주세요.'
          value={inputPassword_check}
          onChange={onChangePassword_check}
        />
      </div>
      <div>
        <label>인증 코드 | </label>
        <input
          type='text'
          name='인증 코드'
          placeholder='인증 코드를 입력해 주세요.'
          value={inputIdentify_code}
          onChange={onChangeIdentify_code}
        />
      </div>
      <div>
        <label>이메일 | </label>
        <input
          type='text'
          name='이메일'
          placeholder='이메일을 입력해 주세요.'
          value={inputEmail}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label>이름 | </label>
        <input
          type='text'
          name='이름'
          placeholder='이름을 입력해 주세요.'
          value={inputName}
          onChange={onChangeName}
        />
      </div>
      <div>
        <label>닉네임 | </label>
        <input
          type='text'
          name='닉네임'
          placeholder='닉네임을 입력해 주세요.'
          value={inputNickname}
          onChange={onChangeNickname}
        />
      </div>
      <div>
        <label>생년월일 | </label>
        <input
          type='date'
          name='생년월일'
          placeholder='생년월일을 입력해 주세요.'
          value={inputBirthday}
          onChange={onChangeBirthday}
        />
      </div>
      <div>
        <button type='button' onClick={onClickSignup} disabled={DataCheck()}>
          회원가입하기
        </button>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Signup;
