import { useState } from "react";
import styles from "./MyPage.module.css";
import Modal from "react-modal";

export default function ModaluserPermissions() {
    const [isOpen, setIsOpen] = useState(false);
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    return (
      <div>
        <button onClick={openModal} className={styles.explanationUserAuthority}>
          ⨀ 사용자 권한 더 알아보기
        </button>
  
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className={styles.Guidemodal}
        >
          <h1 className={styles.GuideText}>관리자/유저 권한</h1>
          <img
            src='/img/UserAuthorityImg.png'
            className={styles.UserAuthorityImg}
          />
          <button className={styles.UserAuthorityButton} onClick={closeModal}>
            닫기
          </button>
        </Modal>
      </div>
    );
  }