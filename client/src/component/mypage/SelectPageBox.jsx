import { useEffect, useState } from "react";
import styles from "./MyPage.module.css";

export default function SelectPageBox(props) {
    const [pages, setpages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
        setpages(_pages);
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