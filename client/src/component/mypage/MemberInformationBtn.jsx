import { useState } from "react";
import Modal from 'react-modal';
import styles from "./MyPage.module.css";

export default function MemberInformationBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal2 = () => {
    setIsOpen2(true);
  };
  const closeModal2 = () => {
    setIsOpen2(false);
    setIsOpen(false);
  };

  const save = () => {
    setIsOpen2(false);
    setIsOpen(false);
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
          />
          <br></br>
          <input
            placeholder='Password'
            className={styles.modalIntput}
            id='pwd'
            type='password'
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
            required
          />
          <input
            className={styles.modal2Intput}
            placeholder='Email'
            id='user_email'
            type='email'
            required
          />
          <input
            className={styles.modal2Intput}
            placeholder='Nickname'
            id='user_nickname'
            type='text'
            maxlength='10'
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