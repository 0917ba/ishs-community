import styles from './MyPage.module.css';
import { useEffect, useState } from "react";
import Modal from "react-modal"
import DemeritList from './Demerit.';
import PostList from "../component/PostList/PostList";


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
    <button onclick={props.moveMyPageSite} className={styles.ButtonMovePageList}>
      <h7>{props.moveMyPage}</h7>
    </button>
  </div>
}

const _pages = [
  { pageName: '아이디/학번', pageSite:"UserInformationBox"},
  { pageName: '누적 벌점', pageSite:"UserDemeritBox"},
  { pageName: '유저 계급', pageSite:"UserRankBox"},
  { pageName: '이메일', pageSite:"UserEmailBox"},
  { pageName: '보유 ATP', pageSite:"UserATPBox"},
  { pageName: '도움말', pageSite:"HelpUserBox"},
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

  const [content, setContent] = useState();

  const handleClickButton = e => {
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
  };

  return <div className={styles.MyMovebox}>
    <img src="/img/myIcon.png" height="150px" width="230px" className={styles.UserImage} />
    <div className={styles.MovePageList}>
      {
        isLoading ? <div>Loading...</div> :
        pages.map((pages, index) => {
          return (
            <div>
              <div>
                {/* <MoveMyPage key={index} moveMyPage={pages.pageName} moveMyPageSite={pages.pageSite}/> */}
                <button onClick={handleClickButton} name={pages.pageSite} key={index}>
                  {pages.pageName}
                </button>
              </div>
              {/* {content && <content>{selectComponent[content]}</content>} */}
            </div>
          );
        })
      }
    </div>
    <MemberInformationBtn />
    <button onclick="location.href='address'" className={styles.logout}>로그아웃</button>
    <SelectPageBox Content={content}/>
  </div>
}

function MemberInformationBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      BackGroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <div>
      <button onClick={openModal} className={styles.MemberInformation}>회원 정보 수정</button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div>회원 정보 수정</div>
        <p>비빌번호를 입력해주세요</p>
        <input type="text" placeholder="Password" />
        <button onClick={closeModal}>확인</button>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
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


function SelectPageBox(props) {
  const [pages, setpages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setpages(_pages);
    }, 1000);
  }, []);

  const [content, setContent] = useState();

  const handleClickButton = e => {
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
  };

  return <div className={styles.MySelectbox}>
    <h1 className={styles.MySelectTitle}>나의 활동</h1>
    {
      isLoading ? <div>Loading...</div> : 
      <div>
        <WritingPageBox />
        {props.Content && <props.Content>{selectComponent[props.Content]}</props.Content>}
        {/* <HelpUserBox /> */}
        {/* <UserInformationBox /> */}
        {/* <누적벌점 /> */}
        {/* <UserRankBox /> */}
        {/* <UserEmailBox /> */}
        {/* <UserATPBox /> */}
      </div>
    }
  </div>
}

function ModaluserPermissions() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      BackGroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "40vw",
      height: "60vh",
      margin: "auto",
      borderRadius: "0.2vw",
      padding: "4vw",
    },
  };

  return (
    <div>
      <button onClick={openModal} className={styles.explanationUserAuthority}>⨀ 사용자 권한 더 알아보기</button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <h1>사용자 권한</h1>
        <p>모달 컨텐츠</p>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
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

function UserInformation(props){
  return <div>
    <div className={styles.HrUserInformation}>사용자 명 : {props.UserName}</div>
    <div className={styles.HrUserInformation}>사용자 ID : {props.UserId}</div>
    <div className={styles.HrUserInformation}>사용자 학번 : {props.UserStudentID}</div>
  </div>
}

const _userInformation = [
  { userName: '인곽이', userId: 'ISHS2930', userStudentID: "2501"},
]

function UserInformationBox() {
  const [userInformation, setuserInformation] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setuserInformation(_userInformation);
    }, 1000);
  }, []);

  return <div>
    <img src="/img/myIcon.png" height="150px" width="230px" className={styles.UserInformationImage} />
    <div>
      {
        isLoading ? <div>Loading...</div> :
        userInformation.map((userInformation, index) => {
          return <UserInformation key={index} UserName={userInformation.userName} 
          UserId={userInformation.userId}
          UserStudentID={userInformation.userStudentID}/>
        })
      }
    </div>
    <UserAuthorityBox /> 
    <ModaluserPermissions />
  </div>
}

function UserAuthority(props){
  return <div>
    <div className={styles.UserAuthority}>사용자 권한 : {props.UserAuthorityName}</div>
  </div>
}

const _userauthority = [
  {Userauthority: '사용자 권한'}
]

function UserAuthorityBox() {
  const [userauthority, setuserauthority] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setuserauthority(_userauthority);
    }, 1000);
  }, []);

  return <div>
    <div>
      {
        isLoading ? <div>Loading...</div> :
        userauthority.map((userauthority, index) => {
          return <UserAuthority key={index} UserAuthorityName={userauthority.Userauthority}/>
        })
      }
    </div>
  </div>
}

function UserRank(props){
  return <div>
    <ModaluserRank />
    <img src={props.userRankImg} height="150px" width="230px" className={styles.UserInformationImage} />
    <div className={styles.userRankName}>{props.userRankName}</div>
  </div>
}

const _userRank = [
  { userRankName: "사용자님은 다이아몬드 등급입니다.", userRankImg: "/img/UserRankImg/UserRankDiamond.png"},
]

function ModaluserRank() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      BackGroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <div>
      <button onClick={openModal} className={styles.modaluserRank}>⨀ 회원등급 시스템 더 알아보기</button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div>사용자 권한</div>
        <p>모달 컨텐츠</p>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}

function UserRankBox() {
  const [userRank, setuserRank] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setuserRank(_userRank);
    }, 1000);
  }, []);

  return <div>
    <div>
      {
        isLoading ? <div>Loading...</div> :
        userRank.map((userRank, index) => {
          return <UserRank key={index} userRankName={userRank.userRankName} 
          userRankImg={userRank.userRankImg}/>
        })
      }
    </div>
  </div>
}

function UserEmailBox() {
  return <div>
    <div>서비스 준비 중입니다...</div>
  </div>
}

function UserATP(props){
  return <div>
    <ModaluserATP />
    <div className={styles.atpGuide}>{props.userATPguide}</div>
    <div className={styles.atp}>{props.userATP}</div>
  </div>
}

const _userATP = [
  { userATPguide: "나의 ATP", userATP: "100000ATP"},
]

function ModaluserATP() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      BackGroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <div>
      <button onClick={openModal} className={styles.modaluserRank}>⨀ ATP 시스템 더 알아보기</button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div>사용자 권한</div>
        <p>모달 컨텐츠</p>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}

function UserATPBox() {
  const [userATP, setuserATP] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setuserATP(_userATP);
    }, 1000);
  }, []);

  return <div>
    <div>
      {
        isLoading ? <div>Loading...</div> :
        userATP.map((userATP, index) => {
          return <UserATP key={index} userATPguide={userATP.userATPguide} 
          userATP={userATP.userATP}/>
        })
      }
    </div>
  </div>
}

function UserDemerit(props){
  return <div>
    <ModaluserDemerit />
    <u2 className={styles.DemeritGuide}>현재 누적 벌점은 {props.userDemerit}점</u2>
  </div>
}

const _userDemerit = [
  { Demerit: "100"},
]

function ModaluserDemerit() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      BackGroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <div>
      <button onClick={openModal} className={styles.modaluserDemerit}>⨀ 벌점 시스템 더 알아보기</button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div>사용자 권한</div>
        <p>모달 컨텐츠</p>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}

function UserDemeritBox() {
  const [userDemerit, setuserDemerit] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setuserDemerit(_userDemerit);
    }, 1000);
  }, []);

  return <div>
    <div>
      {
        isLoading ? <div>Loading...</div> :
        userDemerit.map((userDemerit, index) => {
          return( 
          <div>
            <UserDemerit key={index} userDemerit={userDemerit.Demerit}/>
            <DemeritList />
          </div>
          );
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