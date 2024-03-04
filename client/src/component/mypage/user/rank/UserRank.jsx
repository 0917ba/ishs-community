import styles from '../../MyPage.module.css';
import ModaluserRank from '../../modal/ModalUserRank';

export default function UserRank(props) {
    return (
      <div>
        <ModaluserRank />
        <img
          src={props.userRankImg}
          height='150px'
          width='230px'
          className={styles.UserInformationImage}
        />
        <div className={styles.userRankName}>{props.userRankName}</div>
      </div>
    );
  }