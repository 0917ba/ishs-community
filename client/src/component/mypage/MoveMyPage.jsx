import styles from "./MyPage.module.css";

export default function MoveMyPage(props) {
    return (
      <div>
        <button
          onclick={props.moveMyPageSite}
          className={styles.ButtonMovePageList}
        >
          <h7>{props.moveMyPage}</h7>
        </button>
      </div>
    );
}