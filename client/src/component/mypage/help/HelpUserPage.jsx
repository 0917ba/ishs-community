import styles from "../MyPage.module.css";

export default function HelpUserPage(props) {
    return (
      <div>
        <div onclick={props.HelpPageSite} className={styles.HelpUserBox}>
          <img
            src={props.HelpImg}
            height='30px'
            width='30px'
            className={styles.HelpImage}
          />
          <h4 className={styles.Helptext}>{props.HelpUserName}</h4>
        </div>
      </div>
    );
  }