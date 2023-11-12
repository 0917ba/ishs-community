import styles from './MyPage.module.css';
import { useEffect, useState } from "react";

// function Post(props) {
//   return <div className={styles.Post}>
//     <div>{props.title}</div>
//     <div>{props.content}</div>
//   </div>
// }

// const _posts = [
//   { title: 'hello', content: 'world' },
//   { title: 'ishs', content: 'world' },
//   { title: 'raibit', content: 'world' },
// ]

// function PostBox() {
//   const [posts, setPosts] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//       setPosts(_posts);
//     }, 1000);
//   }, []);

//   return <div className={styles.PostBox}>
//     <div>Post Box</div>
//     {
//       isLoading ? <div>Loading...</div> :
//       posts.map((post, index) => {
//         return <Post key={index} title={post.title} content={post.content} />
//       })
//     }
//   </div>
// }

// function MainPageTitle(props) {
//   const [a, setA] = useState(false);
//   return <div className={props.a}>
//     <div>{props.title}</div>
//   </div>
// }

function MainPageTitle(props) {
  return <div onclick={props.moveMyPageSite} className={styles.Mainbox}>
    <h3>{props.title}</h3>
  </div>
}

const _mainpagelist = [
  { mainpageName: '학교 소개', mainpageSite: "location.href='address'"},
  { mainpageName: '지식 in곽', mainpageSite: "location.href='address'"},
  { mainpageName: '학교 일정', mainpageSite: "location.href='address'"},
  { mainpageName: '학습 자료', mainpageSite: "location.href='address'"},
  { mainpageName: '면불 신청', mainpageSite: "location.href='address'"},
  { mainpageName: '동아리 리그전', mainpageSite: "location.href='address'"},
  { mainpageName: '빅뱅', mainpageSite: "location.href='address'"},
  { mainpageName: '광고 신청', mainpageSite: "location.href='address'"},
]

function MainPageBox() {
  const [mainpagelist, setmainpagelist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setmainpagelist(_mainpagelist);
    }, 1);
  }, []);
  return <div className={styles.Maincontainer}>
    <img src="/img/log_ishs_image.png" height="60px" width="160px" className={styles.Mainbox}/>
    {
      isLoading ? <div>Loading...</div> :
      mainpagelist.map((mainpagelist, index) => {
        return <MainPageTitle key={index} title={mainpagelist.mainpageName} moveMyPageSite={mainpagelist.mainpageSite}/>
      })
    }
  </div>
}


function MoveMyPage(props){
  return <div>
    <div onclick={props.moveMyPageSite} className={styles.ButtonMovePageList}>
      <h4>{props.moveMyPage}</h4>
    </div>
  </div>
}

const _pages = [
  { pageName: '아이디/학번', pageSite:"location.href='address'"},
  { pageName: '누적 벌점', pageSite:"location.href='address'"},
  { pageName: '유저 계급', pageSite:"location.href='address'"},
  { pageName: '이메일', pageSite:"location.href='address'"},
  { pageName: '보유 ATP', pageSite:"location.href='address'"},
]

function MovePageBox() {
  const [pages, setpages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setpages(_pages);
    }, 1000);
  }, []);

  return <div className={styles.MyMovebox}>
    <img src="/img/myIcon.png" height="150px" width="230px" className={styles.UserImage} />
    <div className={styles.MovePageList}>
      {
        isLoading ? <div>Loading...</div> :
        pages.map((pages, index) => {
          return <MoveMyPage key={index} moveMyPage={pages.pageName} moveMyPageSite={pages.pageSite}/>
        })
      }
    </div>
    <button onclick="window.open('address','window_name','width=430,height=500,location=no,status=no,scrollbars=yes');"
    className={styles.MemberInformation}>회원 정보 수정</button>
  </div>
}

function Notification() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return <div>
    <div className={styles.notification}>공지</div>
      <div className={styles.notificationDetail}>오늘은 9월 첫날입니다.</div>
  </div>
}

function SelectPageBox() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return <div className={styles.MySelectbox}>
    <h1 className={styles.MySelectTitle}>나의 활동</h1>
    <hr className={styles.hrstyle}></hr>
    {
      isLoading ? <div>Loading...</div> : 
      <div>
        <WritingPageBox />
        <HelpUserBox />
      </div>
    }
    <button onclick="location.href='address'" className={styles.logout}>로그아웃</button>
  </div>
}

function WritingPageTitle(props) {
  return <div onclick={props.moveMyPageSite} className={styles.writingbox}>
    <div>{props.writing}</div>
  </div>
}

const _Writingpagelist = [
  { writingpageName: '내 커뮤니티 글', writingpageSite: "location.href='address'"},
  { writingpageName: '내가 작성한 댓글', writingpageSite: "location.href='address'"},
  { writingpageName: '내가 추천한 글', writingpageSite: "location.href='address'"},
]

function WritingPageBox() {
  const [Writingpagelist, setwritingpagelist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setwritingpagelist(_Writingpagelist);
    }, 1000);
  }, []);

  return <div className={styles.writingboxcontainer}>
    {
      isLoading ? <div>Loading...</div> :
      Writingpagelist.map((Writingpagelist, index) => {
        return <WritingPageTitle key={index} writing={Writingpagelist.writingpageName} moveMyPageSite={Writingpagelist.writingpageSite}/>
      })
    }
  </div>
}

function HelpUserPage(props){
  return <div>
    <div onclick={props.HelpPageSite} className={styles.HelpUserBox}>
      <img src={props.HelpImg} height="30px" width="30px" className={styles.HelpImage} />
      <h4 className={styles.Helptext}>{props.HelpUserName}</h4>
    </div>
  </div>
}

const _helpUser = [
  { helpimg: "/img/question.png", helpusername: '자주 묻는 질문', helppagesite:"location.href='address'"},
  { helpimg: "/img/service_center.png", helpusername: '고객센터', helppagesite:"location.href='address'"},
  { helpimg: "/img/Terms_of_Use.png", helpusername: '이용약관', helppagesite:"location.href='address'"},
  { helpimg: "/img/Gambling_addiction_counseling.png", helpusername: '도박 중독 상담', helppagesite:"location.href='address'"},
]

function HelpUserBox() {
  const [helpUser, sethelpUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      sethelpUser(_helpUser);
    }, 1000);
  }, []);

  return <div>
    <div>
      {
        isLoading ? <div>Loading...</div> :
        helpUser.map((helpUser, index) => {
          return <HelpUserPage key={index} HelpImg={helpUser.helpimg} 
          HelpUserName={helpUser.helpusername} HelpPageSite={helpUser.helppagesite}/>
        })
      }
    </div>
  </div>
}



function MyPage() {
  return (
    <body>
      <div className={styles.static}>
        <MainPageBox />
        <div className={styles.BackGroundColor}></div>
        <Notification />
        <div className={styles.Myboxcontainer}>
          <div className={styles.relative}>
              <MovePageBox />
              <SelectPageBox />
          </div>
        </div>
      </div>
    </body>
  );
}


export default MyPage;