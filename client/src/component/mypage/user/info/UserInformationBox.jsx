import { useEffect, useState } from "react";
import UserInformation from "./UserInformation";
import ModaluserPermissions from "../../modal/ModalUserPermissions";
import styles from "../../MyPage.module.css";
import UserAuthorityBox from "../auth/UserAuthorityBox";
  
export default function UserInformationBox(props) {
    const [userInformation, setuserInformation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const data = props.data;
      const _userInformation = [
        {
          userName: data.studentName,
          userId: data.userid,
          userStudentID: data.studentNumber,
          userbirthday: data.birthday,
          userEmail: data.email,
          userNickname: data.nickname,
        },
      ];
      // setTimeout(() => {
      //   setIsLoading(false);
      //   setuserInformation(_userInformation);
      // }, 1000);
      setIsLoading(false);
      setuserInformation(_userInformation);
  
      console.log(_userInformation);
    }, [props]);
  
    return (
      <div>
        <h1 className={styles.MySelectTitle}>회원 정보</h1>
        <img
          src='/img/myIcon.png'
          height='150px'
          width='230px'
          className={styles.UserInformationImage}
        />
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            userInformation.map((userInformation, index) => {
              return (
                <UserInformation
                  key={index}
                  UserName={userInformation.userName}
                  UserId={userInformation.userId}
                  UserStudentID={userInformation.userStudentID}
                  UserBirthday={userInformation.userbirthday}
                  UserEmail={userInformation.userEmail}
                  UserNickname={userInformation.userNickname}
                />
              );
            })
          )}
        </div>
        <UserAuthorityBox data={props.data} />
        <ModaluserPermissions />
      </div>
    );
}