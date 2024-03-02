import { useEffect, useState } from "react";
import UserDemerit from "./UserDemerit";

import styles from "../../MyPage.module.css";
import DemeritList from "../../../../routes/Demerit";

export default function UserDemeritBox(props) {
    const [userDemerit, setuserDemerit] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
        setuserDemerit(props.userDemerit);
      }, 1000);
    }, []);
  
    return (
      <div>
        <h1 className={styles.MySelectTitle}>누적 벌점</h1>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            userDemerit.map((userDemerit, index) => {
              return (
                <div>
                  <UserDemerit key={index} userDemerit={userDemerit.Demerit} />
                  <DemeritList />
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }