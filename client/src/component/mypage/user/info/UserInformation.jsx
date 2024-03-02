import styles from '../../MyPage.module.css';

export default function UserInformation(props) {
    return (
      <div>
        <div className={styles.HrUserInformation}>
          사용자 명 : {props.UserName}
        </div>
        <div className={styles.HrUserInformation}>사용자 ID : {props.UserId}</div>
        <div className={styles.HrUserInformation}>
          사용자 학번 : {props.UserStudentID}
        </div>
        <div className={styles.HrUserInformation}>
          생 년 월 일 : {props.UserBirthday}
        </div>
        <div className={styles.HrUserInformation}>Email : {props.UserEmail}</div>
      </div>
    );
  }