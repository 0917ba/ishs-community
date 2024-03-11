import { useState } from "react";
import Modal from 'react-modal';
import styles from "./MyPage.module.css";
import { useNavigate } from "react-router-dom";

export default function MemberInformationBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [userid, setUserid] = useState('');
  const [pwd, setPwd] = useState('');
  const [user_pw, setUser_pw] = useState('');
  const [user_email, setUser_email] = useState('');
  const [user_nickname, setUser_nickname] = useState('');
  const [user_date, setUser_date] = useState('');
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal2 = async () => {
    fetch(`/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        id: userid,
        password: pwd,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setIsOpen2(true);
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    });
  };
  const closeModal2 = () => {
    setIsOpen2(false);
    setIsOpen(false);
  };

  const save = () => {
    fetch('/user/info', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        password: user_pw,
        email: user_email,
        nickname: user_nickname,
        birthday: user_date,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setIsOpen2(false);
        setIsOpen(false);
        alert('회원 정보가 변경되었습니다.');
        navigate('/mypage')
      } else {
        setIsOpen2(false);
        setIsOpen(false);
        alert('회원 정보 변경에 실패했습니다.');
      }
    })
  };

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      openModal2();
    }
  };

  const customStyles = {
    overlay: {
      BackGroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div>
      <button onClick={openModal} className={styles.MemberInformation}>
        회원 정보 변경
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.modal}
      >
        <div className={styles.modalTitle}>회원 인증</div>
        <form className={styles.modalAll} onKeyPress={handleOnKeyPress}>
          <input
            placeholder='ID'
            className={styles.modalIntput}
            id='userid'
            type='text'
            onChange={(e) => { setUserid(e.target.value); }}
          />
          <br></br>
          <input
            placeholder='Password'
            className={styles.modalIntput}
            id='pwd'
            type='password'
            onChange={(e) => { setPwd(e.target.value); }}
          />
        </form>
        <button className={styles.modalButton} onClick={openModal2}>
          확인
        </button>
        <button className={styles.modalButton2} onClick={closeModal}>
          닫기
        </button>
      </Modal>

      <Modal
        isOpen={isOpen2}
        onRequestClose={closeModal2}
        className={styles.modal2}
      >
        <div className={styles.modal2Title}>회원 정보 변경</div>
        <form className={styles.modal2All}>
          <input
            className={styles.modal2Intput}
            placeholder='Password'
            id='user_pw'
            type='password'
            maxlength='10'
            onChange={(e) => { setUser_pw(e.target.value); }}
            required
          />
          <input
            className={styles.modal2Intput}
            placeholder='Email'
            id='user_email'
            type='email'
            onChange={(e) => { setUser_email(e.target.value); }}
            required
          />
          <input
            className={styles.modal2Intput}
            placeholder='Nickname'
            id='user_nickname'
            type='text'
            maxlength='10'
            onChange={(e) => { setUser_nickname(e.target.value); }}
            required
          />
          <div></div>
          <input
            className={styles.modal2Intput}
            placeholder='BrithDay'
            id='user_date'
            type='date'
            max='3000-12-31'
            min='1900-01-01'
            onChange={(e) => { setUser_date(e.target.value); }}
            required
          />
          <br />
        </form>
        <button className={styles.modal2Button} onClick={save}>
          저장
        </button>
        <button className={styles.modal2Button2} onClick={closeModal2}>
          취소
        </button>
      </Modal>
    </div>
  );
}