import { useEffect, useState } from "react";
import styles from "../MyPage.module.css";
import HelpUserPage from "./HelpUserPage";
  
export default function HelpUserBox() {
    const [helpUser, sethelpUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const _helpUser = [
      {
        helpimg: '/img/question.png',
        helpusername: '자주 묻는 질문',
        helppagesite: "location.href='address'",
      },
      {
        helpimg: '/img/service_center.png',
        helpusername: '고객센터',
        helppagesite: "location.href='address'",
      },
      {
        helpimg: '/img/Terms_of_Use.png',
        helpusername: '이용약관',
        helppagesite: "location.href='address'",
      },
      {
        helpimg: '/img/Gambling_addiction_counseling.png',
        helpusername: '도박 중독 상담',
        helppagesite: "location.href='address'",
      },
    ];
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
        sethelpUser(_helpUser);
      }, 1000);
    }, []);
  
    return (
      <div>
        <h1 className={styles.MySelectTitle}>도움말</h1>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            helpUser.map((helpUser, index) => {
              return (
                <HelpUserPage
                  key={index}
                  HelpImg={helpUser.helpimg}
                  HelpUserName={helpUser.helpusername}
                  HelpPageSite={helpUser.helppagesite}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
  