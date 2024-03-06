import { useEffect, useState } from "react";
import styles from "./MyPage.module.css";

export default function Notification() {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, []);
  
    return (
      <div>
        <div className={styles.notification}>공지</div>
        <div className={styles.notificationDetail}>오늘은 9월 첫날입니다.</div>
      </div>
    );
  }