import styles from "./MyPage.module.css";

export default function MainPageTitle(props) {
    return (
      <div onclick={props.moveMyPageSite} className={styles.Mainbox}>
        <h3>{props.title}</h3>
      </div>
    );
}