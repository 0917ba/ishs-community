import { useState } from "react";
import Modal from "react-modal";

import styles from "../MyPage.module.css";

const _userDemerit = [{ Demerit: '100' }];

export default function ModaluserDemerit() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className={styles.modaluserDemerit}>
        ⨀ 벌점 시스템 더 알아보기
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.Guidemodal}
      >
        <h1 className={styles.GuideText}>벌점</h1>
        <table
          border='1'
          bordercolor='black'
          cellspacing='4'
          className={styles.Demerittable}
        >
          <caption align='center'>
            <h3>벌점 부여 기준</h3>
          </caption>
          <tr align='center'>
            <th scope='col'>항목</th>
            <th scope='col'>점수</th>
          </tr>
          <tr align='center'>
            <td>과도한 욕설</td>
            <td>1</td>
          </tr>
          <tr align='center'>
            <td>성적(性的) 발언</td>
            <td>1</td>
          </tr>
          <tr align='center'>
            <td>성적(成績) 발언</td>
            <td>1</td>
          </tr>
          <tr align='center'>
            <td>혐오 사진</td>
            <td>1</td>
          </tr>
          <tr align='center'>
            <td>도배글</td>
            <td>3</td>
          </tr>
          <tr align='center'>
            <td>허위사실 유포</td>
            <td>3</td>
          </tr>
          <tr align='center'>
            <td>교직원에 대한 비하적 표현</td>
            <td>5</td>
          </tr>
        </table>
        <table
          border='1'
          bordercolor='black'
          cellspacing='4'
          className={styles.Demerittable2}
        >
          <caption align='center'>
            <h3>누적 벌점에 따른 처벌</h3>
          </caption>
          <tr align='center'>
            <th scope='col'>점수</th>
            <th scope='col'>처벌</th>
          </tr>
          <tr align='center'>
            <td>1 ~ 2</td>
            <td>12시간 정지</td>
          </tr>
          <tr align='center'>
            <td>3 ~ 5</td>
            <td>하루</td>
          </tr>
          <tr align='center'>
            <td>6 ~ 10</td>
            <td>3일</td>
          </tr>
          <tr align='center'>
            <td>10~20</td>
            <td>일주일</td>
          </tr>
          <tr align='center'>
            <td>20 초과</td>
            <td>영구 정지, 선생님께 보고됨</td>
          </tr>
        </table>
        <div className={styles.DemeritText}>
          벌점은 1년 단위로 누적되며, 벌점을 받으면 누적 벌점에 해당하는 처벌을
          받게 됩니다.
        </div>
        <div className={styles.DemeritText}>
          마이페이지에서 내가 받은 벌점을 알 수 있습니다.
        </div>
        <div className={styles.DemeritText}>
          또한 극도로 유해한 글은 벌점과 무관하게 선생님께 회부될 수 있습니다.
          이 점 유의해주세요.
        </div>
        <button className={styles.UserDemeritButton} onClick={closeModal}>
          닫기
        </button>
      </Modal>
    </div>
  );
}