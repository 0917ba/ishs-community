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
    }, 1000);
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
  return <div className={styles.Post}>
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

function SelectPageBox() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return <div className={styles.MySelectbox}>
    <h1>나의 활동</h1>
    <hr></hr>
    {
      isLoading ? <div>Loading...</div> : <div>Loading End</div>
    }
    <button onclick="location.href='address'">로그아웃</button>
  </div>
}



function MyPage() {
  return (
    <div>
      <MainPageBox />
      <div className={styles.BackGroundColor}></div>
      <div className={styles.Myboxcontainer}>
        <div className={styles.relative}>
            <MovePageBox />
            <SelectPageBox />
        </div>
      </div>
    </div>
  );
}


export default MyPage;