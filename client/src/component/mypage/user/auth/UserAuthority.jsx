import styles from '../../MyPage.module.css';

export default function UserAuthority(props) {
    return (
      <div>
        <div className={styles.HrUserInformation}>
          사용자 권한 : {props.UserAuthorityName}
        </div>
      </div>
    );
}