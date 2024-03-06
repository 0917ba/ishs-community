import styles from "../../MyPage.module.css";
import ModaluserDemerit from "../../modal/ModalUserDemerit";

export default function UserDemerit(props) {
    return (
      <div>
        <ModaluserDemerit />
        <u2 className={styles.DemeritGuide}>
          현재 누적 벌점은 {props.userDemerit}점
        </u2>
        <h1></h1>
      </div>
    );
  }