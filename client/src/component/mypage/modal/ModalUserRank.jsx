import { useState } from "react";
import styles from "../MyPage.module.css";
import Modal from "react-modal";

export default function ModaluserRank() {
    const [isOpen, setIsOpen] = useState(false);
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    return (
      <div>
        <button onClick={openModal} className={styles.modaluserRank}>
          ⨀ 유저 랭크 시스템 더 알아보기
        </button>
  
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className={styles.Guidemodal}
        >
          <h1 className={styles.GuideText}>유저 랭크</h1>
          <img src='/img/UserRank.png' className={styles.UserRankImg} />
          <button className={styles.UserRankButton} onClick={closeModal}>
            닫기
          </button>
        </Modal>
      </div>
    );
  }