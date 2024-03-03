import { useEffect, useState } from "react";
import UserATP from "./UserATP";
import styles from "../../MyPage.module.css";

export default function UserATPBox(props) {
    const [userATP, setuserATP] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        // setIsLoading(false);
        // setuserATP(props.userATP);
      }, 1000);
    }, []);
  
    return (
      <div>
        <h1 className={styles.MySelectTitle}>보유 ATP</h1>
        <div>
          {isLoading ? (
            <div>제작중...</div>
          ) : (
            userATP.map((userATP, index) => {
              return (
                <UserATP
                  key={index}
                  userATPguide={userATP.userATPguide}
                  userATP={userATP.userATP}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }