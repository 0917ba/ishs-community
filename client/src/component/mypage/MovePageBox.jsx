import { useEffect, useState } from "react";
import styles from "./MyPage.module.css";
import MemberInformationBtn from "./MemberInformationBtn";
import SelectPageBox from "./user/info/SelectPageBox";
import { useNavigate } from "react-router-dom";

export default function MovePageBox() {
  const navigate = useNavigate();
    const [pages, setpages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const _pages = [
        { pageName: '회원 정보', pageSite: 'UserInformationBox' },
        { pageName: '누적 벌점', pageSite: 'UserDemeritBox' },
        { pageName: '유저 랭크', pageSite: 'UserRankBox' },
        // { pageName: '이메일', pageSite:"UserEmailBox"},
        { pageName: '보유 ATP', pageSite: 'UserATPBox' },
        { pageName: '내 커뮤니티 글', pageSite: 'PostList' },
        { pageName: '내가 작성한 댓글', pageSite: 'PostList' },
        { pageName: '내가 추천한 글', pageSite: 'PostList' },
        // { pageName: '도움말', pageSite:"HelpUserBox"},
      ];
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
        setpages(_pages);
      }, 1000);
    }, []);
  
    const [content, setContent] = useState();
  
    const handleClickButton = (e) => {
      const { name } = e.target;
      setContent(name);
    };
  
    return (
      <div className={styles.MyMovebox}>
        <img
          src='/img/myIcon.png'
          height='150px'
          width='230px'
          className={styles.UserImage}
        />
        <div className={styles.MovePageList}>
          {pages.map((pages, index) => {
            return (
              <div key={index}>
                <div>
                  {/* <MoveMyPage key={index} moveMyPage={pages.pageName} moveMyPageSite={pages.pageSite}/> */}
                  <button
                    className={styles.contentButton}
                    onClick={handleClickButton}
                    name={pages.pageSite}
                    key={index}
                  >
                    {pages.pageName}
                  </button>
                </div>
                {/* {content && <content>{selectComponent[content]}</content>} */}
              </div>
            );
          })}
        </div>
        <MemberInformationBtn />
        <button className={styles.logout}>
          로그아웃
        </button>
        <SelectPageBox Content={content} pages={pages} />
      </div>
    );
  }