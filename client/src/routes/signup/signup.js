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
    console.log('signup');
    console.log(
      inputKey,
      inputId,
      inputPassword,
      inputIdentify_code,
      inputEmail,
      inputName,
      inputNickname,
      inputBirthday
    );
    console.log(typeof inputKey);
    let ninputKey = parseInt(inputKey);
    console.log(typeof ninputKey);
    let dinputBirthday = new Date(inputBirthday);
    console.log(typeof dinputBirthday);

    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        key: ninputKey,
        id: inputId,
        password: inputPassword,
        identifycode: inputIdentify_code,
        email: inputEmail,
        studentname: inputName,
        nickname: inputNickname,
        birthday: dinputBirthday,
      }),
    };

    //const serverUrl = process.env.REACT_APP_SERVER_URL;

    const res = await fetch('/signup', formData);
    const data = await res.json();
    console.log(data);

    const status = data.status;
    console.log(status);

    const getMessage = data.content;

    setInputKey('');
    setInputId('');
    setInputPassword('');
    setInputPassword_check('');
    setInputIdentify_code('');
    setInputEmail('');
    setName('');
    setInputNickname('');

    if (status === 200) {
      navigate('/register/success');
    }
    if (status === 400) {
      setMessage(getMessage);
    }
    if (status === 500) {
      navigate('/developer/special');
    }
  };

  const DataCheck = () => {
    if (inputPassword !== inputPassword_check) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (inputPassword_check === '') {
      setPWMessage('');
    } else {
      if (inputPassword_check !== inputPassword) {
        setPWMessage('비밀번호가 일치하지 않습니다.');
      } else setPWMessage('비밀번호가 일치합니다.');
    }
  }, [inputPassword, inputPassword_check]);
  return (
    <div className={styles.all}>
      <div className={styles.modal}></div>
      <div className={styles.font}>Sign Up</div>
      <div className={styles.StudentID}>
        <label>학번</label>
        <input
          type='text'
          name='학번'
          placeholder='0000'
          value={inputKey}
          onChange={onChangeKey}
          pattern='[1-3]{1}[0-9]{3}'
          className={styles.IntputStudentID}
        />
      </div>
      <div className={styles.ID}>
        <div>
          <label>아이디</label>
          <input
            type='text'
            name='아이디'
            placeholder='아이디를 입력해 주세요.'
            value={inputId}
            onChange={onChangeId}
            className={styles.IntputID}
          />
        </div>
      </div>
      <div className={styles.Password}>
        <label>비밀번호</label>
        <input
          type='password'
          name='비밀번호'
          placeholder='비밀번호를 입력해 주세요.'
          value={inputPassword}
          onChange={onChangePassword}
          className={styles.IntputPassword}
        />
      </div>
      <div className={styles.checkPassword}>
        <span>
          <label>비밀번호 확인</label>
          <input
            type='password'
            name='비밀번호 확인'
            placeholder='비밀번호를 다시 입력해 주세요.'
            value={inputPassword_check}
            onChange={onChangePassword_check}
            className={styles.checkIntputPassword}
          />
        </span>
      </div>

      <span>
        <p className={styles.checkMessage}>{PWmessage}</p>
      </span>

      <div className={styles.code}>
        <label>인증 코드</label>
        <input
          type='text'
          name='인증 코드'
          placeholder='인증 코드를 입력해 주세요.'
          value={inputIdentify_code}
          onChange={onChangeIdentify_code}
          className={styles.Intputcode}
        />
      </div>
      <div className={styles.email}>
        <label>이메일</label>
        <input
          type='text'
          name='이메일'
          placeholder='이메일을 입력해 주세요.'
          value={inputEmail}
          onChange={onChangeEmail}
          className={styles.Intputemail}
        />
      </div>
      <div className={styles.name}>
        <label>이름</label>
        <input
          type='text'
          name='이름'
          placeholder='이름을 입력해 주세요.'
          value={inputName}
          onChange={onChangeName}
          className={styles.Intputname}
        />
      </div>
      <div className={styles.Nickname}>
        <label>닉네임</label>
        <input
          type='text'
          name='닉네임'
          placeholder='닉네임을 입력해 주세요.'
          value={inputNickname}
          onChange={onChangeNickname}
          className={styles.IntputNickname}
        />
      </div>

      <div>
        <button
          type='button'
          onClick={onClickSignup}
          disabled={DataCheck()}
          className={styles.signup}
        >
          회원가입하기
        </button>
      </div>
      <div className={styles.signupMessage}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Signup;
