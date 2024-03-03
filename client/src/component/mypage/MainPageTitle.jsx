import { useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css";

export default function MainPageTitle(props) {

  const navigate = useNavigate();

  const handleClickButton = (e) => {
    navigate("/mypage");
  };

    return (
      <div onClick={handleClickButton} className={styles.Mainbox}>
        <h3>{props.title}</h3>
      </div>
    );
}