import { useEffect, useState } from "react";
import styles from "../../MyPage.module.css";
import UserRank from "./UserRank";

const _userRank = [
    {
      userRankName: '사용자님은 다이아몬드 등급입니다.',
      userRankImg: '/img/UserRankImg/UserRankDiamond.png',
    },
  ];
  
export default function UserRankBox() {
    const [userRank, setuserRank] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
        setuserRank(_userRank);
      }, 1000);
    }, []);
  
    return (
      <div>
        <h1 className={styles.MySelectTitle}>유저 랭크</h1>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            userRank.map((userRank, index) => {
              return (
                <UserRank
                  key={index}
                  userRankName={userRank.userRankName}
                  userRankImg={userRank.userRankImg}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }