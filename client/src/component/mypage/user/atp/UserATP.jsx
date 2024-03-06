import styles from '../../MyPage.module.css';
import ModaluserATP from '../../modal/ModalUserATP';

export default function UserATP(props) {
    return (
      <div>
        <ModaluserATP />
        <div className={styles.atpGuide}>{props.userATPguide}</div>
        <div className={styles.atp}>{props.userATP}</div>
      </div>
    );
  }