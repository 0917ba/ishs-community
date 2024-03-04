import { useEffect, useState } from "react";
import styles from "./MyPage.module.css";
import HelpUserBox from "./help/HelpUserBox";
import UserRankBox from "./user/rank/UserRankBox";
import UserEmailBox from "./user/email/UserEmailBox";
import UserATPBox from "./user/atp/UserATPBox";
import UserDemeritBox from "./user/demerit/UserDemeritBox";
import UserInformationBox from "./user/info/UserInformationBox";
import PostList from "../PostList/PostList";

export default function SelectPageBox(props) {
    const [pages, setpages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setIsLoading(false);
      setpages(props.pages);
    }, [props]);
  
    // const [content, setContent] = useState();
  
    // const handleClickButton = (e) => {
    //   const { name } = e.target;
    //   setContent(name);
    // };
  
    const selectComponent = {
      HelpUserBox: <HelpUserBox />,
      UserInformationBox: <UserInformationBox data={props.data}/>,
      UserRankBox: <UserRankBox />,
      UserEmailBox: <UserEmailBox />,
      UserATPBox: <UserATPBox />,
      UserDemeritBox: <UserDemeritBox userDemerit={props.data.penalty}/>,
      PostList: <PostList authorId={props.data.uid}/>,
    };
  
    return (
      <div className={styles.MySelectbox}>
        {
          <div>
            {(props.Content && selectComponent[props.Content])}
          </div>
        }
      </div>
    );
  }