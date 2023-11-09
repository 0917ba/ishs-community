import { useEffect, useState } from 'react';
import styles from './signup.module.css';

function Signup() {
  const [key, setKey] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password_check, setPassword_check] = useState('');
  const [identify_code, setIdentify_code] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');

  const onChangeKey = (e) => {
    setKey(e.target.value);
  };
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePassword_check = (e) => {
    setPassword_check(e.target.value);
  };

  const onChangeIdentify_code = (e) => {
    setIdentify_code(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeBirthday = (e) => {
    setBirthday(e.target.value);
  };

  const onClcikey = () => {
    console.log('signup');
  };

  useEffect =
    (() => {
      console.log('signup');
    },
    []);

  return (
    <div>
      <div>
        <label htmlFor='key'>ID : </label>
        <input type='text' name='key' value={key} onChange={onChangeKey} />
      </div>
      <div>
        <label htmlFor='id'>ID : </label>
        <input type='text' name='id' value={id} onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor='password'>PASSWORD : </label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div>
        <label htmlFor='password_check'>PW : </label>
        <input
          type='password'
          name='password_check'
          value={password_check}
          onChange={onChangePassword_check}
        />
      </div>
      <div>
        <label htmlFor='identify_code'>identify_code : </label>
        <input
          type='text'
          name='identify_code'
          value={identify_code}
          onChange={onChangeIdentify_code}
        />
      </div>
      <div>
        <label htmlFor='email'>email : </label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor='name'>이름 : </label>
        <input type='text' name='name' value={name} onChange={onChangeName} />
      </div>
      <div>
        <label htmlFor='nickname'>nickname : </label>
        <input
          type='text'
          name='nickname'
          value={nickname}
          onChange={onChangeNickname}
        />
      </div>
      <div>
        <label htmlFor='birthday'>birthday : </label>
        <input
          type='date'
          name='birthday'
          value={birthday}
          onChange={onChangeBirthday}
        />
      </div>
    </div>
  );
}

export default Signup;
