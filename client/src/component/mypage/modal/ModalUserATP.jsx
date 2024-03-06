import { useState } from "react";
import styles from "../MyPage.module.css";
import Modal from "react-modal";

export default function ModaluserATP(props) {
  const [isOpen, setIsOpen] = useState(false);
  const _userATP = [{ userATPguide: '나의 ATP', userATP: props.atp }];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className={styles.modaluserATP}>
        ⨀ ATP 시스템 더 알아보기
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.Guidemodal}
      >
        <h1 className={styles.GuideText}>ATP</h1>
        <h1 className={styles.ATPtext}>시스템 개발 예정입니다</h1>
        <button className={styles.UserATPButton} onClick={closeModal}>
          닫기
        </button>
      </Modal>
    </div>
  );
}
