import { useEffect, useState } from "react";
import styles from "../../MyPage.module.css";
import HelpUserBox from "../../help/HelpUserBox";
import UserRankBox from "../rank/UserRankBox";
import UserEmailBox from "../email/UserEmailBox";
import UserATPBox from "../atp/UserATPBox";
import UserDemeritBox from "../demerit/UserDemeritBox";
import PostList from "../../../PostList/PostList";
import UserInformationBox from "../info/UserInformationBox";

export default function SelectPageBox(props) {
    const [pages, setpages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
        setpages(props.pages);
      }, 1000);
    }, []);
  
    const [content, setContent] = useState();
  
    let Content;
  
    const handleClickButton = (e) => {
      const { name } = e.target;
      setContent(name);
    };
  
    const selectComponent = {
      HelpUserBox: <HelpUserBox />,
      UserInformationBox: <UserInformationBox />,
      UserRankBox: <UserRankBox />,
      UserEmailBox: <UserEmailBox />,
      UserATPBox: <UserATPBox />,
      UserDemeritBox: <UserDemeritBox />,
      PostList: <PostList />,
    };
  
    return (
      <div className={styles.MySelectbox}>
        {
          <div>
            {props.Content && (
              <props.Content>{selectComponent[props.Content]}</props.Content>
            )}
          </div>
        }
      </div>
    );
  }