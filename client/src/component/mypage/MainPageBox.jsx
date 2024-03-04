import { useEffect, useState } from "react";
import styles from "./MyPage.module.css";
import MainPageTitle from "./MainPageTitle";

export default function MainPageBox() {
    const [mainpagelist, setmainpagelist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const _mainpagelist = [
        { mainpageName: '학교 소개', mainpageSite: "location.href='address'" },
        { mainpageName: '지식 in곽', mainpageSite: "location.href='address'" },
        { mainpageName: '학교 일정', mainpageSite: "location.href='address'" },
        { mainpageName: '학습 자료', mainpageSite: "location.href='address'" },
        { mainpageName: '면불 신청', mainpageSite: "location.href='address'" },
        { mainpageName: '동아리 리그전', mainpageSite: "location.href='address'" },
        { mainpageName: '빅뱅', mainpageSite: "location.href='address'" },
        { mainpageName: '광고 신청', mainpageSite: "location.href='address'" },
    ];
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
        setmainpagelist(_mainpagelist);
      }, 1);
    }, []);
    return (
      <div className={styles.Maincontainer}>
        <img
          src='/img/log_ishs_image.png'
          height='60px'
          width='160px'
          className={styles.Mainbox}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          mainpagelist.map((mainpagelist, index) => {
            return (
              <MainPageTitle
                key={index}
                title={mainpagelist.mainpageName}
                moveMyPageSite={mainpagelist.mainpageSite}
              />
            );
          })
        )}
      </div>
    );
  }