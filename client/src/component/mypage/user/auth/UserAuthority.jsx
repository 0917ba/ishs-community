import styles from '../../MyPage.module.css';

export default function UserAuthority(props) {
    return (
      <div>
        <h1></h1>
        <div className={styles.UserAuthority}>
          사용자 권한 : {props.UserAuthorityName}
        </div>
      </div>
    );
}