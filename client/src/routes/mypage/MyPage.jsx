import styles from './MyPage.module.css';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DemeritList from '../Demerit.';
import PostList from '../../component/PostList/PostList';

let data = {};

function MainPageTitle(props) {
  return (
    <div onclick={props.moveMyPageSite} className={styles.Mainbox}>
      <h3>{props.title}</h3>
    </div>
  );
}

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

function MainPageBox() {
  const [mainpagelist, setmainpagelist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

function MoveMyPage(props) {
  return (
    <div>
      <button
        onclick={props.moveMyPageSite}
        className={styles.ButtonMovePageList}
      >
        <h7>{props.moveMyPage}</h7>
      </button>
    </div>
  );
}

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

function MovePageBox() {
  const [pages, setpages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
            <div>
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
      <button onclick="location.href='address'" className={styles.logout}>
        로그아웃
      </button>
      <SelectPageBox Content={content} />
    </div>
  );
}

function MemberInformationBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal2 = () => {
    setIsOpen2(true);
  };
  const closeModal2 = () => {
    setIsOpen2(false);
    setIsOpen(false);
  };

  const save = () => {
    setIsOpen2(false);
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      BackGroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div>
      <button onClick={openModal} className={styles.MemberInformation}>
        회원 정보 변경
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.modal}
      >
        <div className={styles.modalTitle}>회원 인증</div>
        <form className={styles.modalAll}>
          <input
            placeholder='ID'
            className={styles.modalIntput}
            id='userid'
            type='text'
          />
          <br></br>
          <input
            placeholder='Password'
            className={styles.modalIntput}
            id='pwd'
            type='password'
          />
        </form>
        <button className={styles.modalButton} onClick={openModal2}>
          확인
        </button>
        <button className={styles.modalButton2} onClick={closeModal}>
          닫기
        </button>
      </Modal>

      <Modal
        isOpen={isOpen2}
        onRequestClose={closeModal2}
        className={styles.modal2}
      >
        <div className={styles.modal2Title}>회원 정보 변경</div>
        <form className={styles.modal2All}>
          <input
            className={styles.modal2Intput}
            placeholder='Password'
            id='user_pw'
            type='password'
            maxlength='10'
            required
          />
          <input
            className={styles.modal2Intput}
            placeholder='Email'
            id='user_email'
            type='email'
            required
          />
          <input
            className={styles.modal2Intput}
            placeholder='Nickname'
            id='user_nickname'
            type='text'
            maxlength='10'
            required
          />
          <div></div>
          <input
            className={styles.modal2Intput}
            placeholder='BrithDay'
            id='user_date'
            type='date'
            max='3000-12-31'
            min='1900-01-01'
            required
          />
          <br />
        </form>
        <button className={styles.modal2Button} onClick={save}>
          저장
        </button>
        <button className={styles.modal2Button2} onClick={closeModal2}>
          취소
        </button>
      </Modal>
    </div>
  );
}

function Notification() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div className={styles.notification}>공지</div>
      <div className={styles.notificationDetail}>오늘은 9월 첫날입니다.</div>
    </div>
  );
}

function SelectPageBox(props) {
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

function ModaluserPermissions() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className={styles.explanationUserAuthority}>
        ⨀ 사용자 권한 더 알아보기
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.Guidemodal}
      >
        <h1 className={styles.GuideText}>관리자/유저 권한</h1>
        <img
          src='/img/UserAuthorityImg.png'
          className={styles.UserAuthorityImg}
        />
        <button className={styles.UserAuthorityButton} onClick={closeModal}>
          닫기
        </button>
      </Modal>
    </div>
  );
}

function HelpUserPage(props) {
  return (
    <div>
      <div onclick={props.HelpPageSite} className={styles.HelpUserBox}>
        <img
          src={props.HelpImg}
          height='30px'
          width='30px'
          className={styles.HelpImage}
        />
        <h4 className={styles.Helptext}>{props.HelpUserName}</h4>
      </div>
    </div>
  );
}

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

function HelpUserBox() {
  const [helpUser, sethelpUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

function UserInformation(props) {
  return (
    <div>
      <div className={styles.HrUserInformation}>
        사용자 명 : {props.UserName}
      </div>
      <div className={styles.HrUserInformation}>사용자 ID : {props.UserId}</div>
      <div className={styles.HrUserInformation}>
        사용자 학번 : {props.UserStudentID}
      </div>
      <div className={styles.HrUserInformation}>
        생 년 월 일 : {props.UserBirthday}
      </div>
      <div className={styles.HrUserInformation}>Email : {props.UserEmail}</div>
    </div>
  );
}

const _userInformation = [
  {
    userName: data.studentName,
    userId: data.id,
    userStudentID: '2402',
    userbirthday: data.birthday,
    userEmail: data.email,
  },
];

function UserInformationBox() {
  const [userInformation, setuserInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(data);
    setTimeout(() => {
      setIsLoading(false);
      setuserInformation(_userInformation);
    }, 1000);

    console.log(_userInformation);
  }, [_userInformation]);

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
              />
            );
          })
        )}
      </div>
      <UserAuthorityBox />
      <ModaluserPermissions />
    </div>
  );
}

function UserAuthority(props) {
  return (
    <div>
      <h1></h1>
      <div className={styles.UserAuthority}>
        사용자 권한 : {props.UserAuthorityName}
      </div>
    </div>
  );
}

const _userauthority = [{ Userauthority: data.role }];

function UserAuthorityBox() {
  const [userauthority, setuserauthority] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setuserauthority(_userauthority);
    }, 1000);
  }, []);

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          userauthority.map((userauthority, index) => {
            return (
              <UserAuthority
                key={index}
                UserAuthorityName={userauthority.Userauthority}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function UserRank(props) {
  return (
    <div>
      <ModaluserRank />
      <img
        src={props.userRankImg}
        height='150px'
        width='230px'
        className={styles.UserInformationImage}
      />
      <div className={styles.userRankName}>{props.userRankName}</div>
    </div>
  );
}

const _userRank = [
  {
    userRankName: '사용자님은 다이아몬드 등급입니다.',
    userRankImg: '/img/UserRankImg/UserRankDiamond.png',
  },
];

function ModaluserRank() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className={styles.modaluserRank}>
        ⨀ 유저 랭크 시스템 더 알아보기
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.Guidemodal}
      >
        <h1 className={styles.GuideText}>유저 랭크</h1>
        <img src='/img/UserRank.png' className={styles.UserRankImg} />
        <button className={styles.UserRankButton} onClick={closeModal}>
          닫기
        </button>
      </Modal>
    </div>
  );
}

function UserRankBox() {
  const [userRank, setuserRank] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setuserRank(_userRank);
    }, 1000);
  }, []);

  return (
    <div>
      <h1 className={styles.MySelectTitle}>유저 랭크</h1>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          userRank.map((userRank, index) => {
            return (
              <UserRank
                key={index}
                userRankName={userRank.userRankName}
                userRankImg={userRank.userRankImg}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function UserEmailBox() {
  return (
    <div>
      <h1 className={styles.MySelectTitle}>이메일</h1>
      <div>서비스 준비 중입니다...</div>
    </div>
  );
}

function UserATP(props) {
  return (
    <div>
      <ModaluserATP />
      <div className={styles.atpGuide}>{props.userATPguide}</div>
      <div className={styles.atp}>{props.userATP}</div>
    </div>
  );
}

const _userATP = [{ userATPguide: '나의 ATP', userATP: data.atp }];

function ModaluserATP() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className={styles.modaluserATP}>
        ⨀ ATP 시스템 더 알아보기
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.Guidemodal}
      >
        <h1 className={styles.GuideText}>ATP</h1>
        <h1 className={styles.ATPtext}>시스템 개발 예정입니다</h1>
        <button className={styles.UserATPButton} onClick={closeModal}>
          닫기
        </button>
      </Modal>
    </div>
  );
}

function UserATPBox() {
  const [userATP, setuserATP] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setuserATP(_userATP);
    }, 1000);
  }, []);

  return (
    <div>
      <h1 className={styles.MySelectTitle}>보유 ATP</h1>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          userATP.map((userATP, index) => {
            return (
              <UserATP
                key={index}
                userATPguide={userATP.userATPguide}
                userATP={userATP.userATP}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function UserDemerit(props) {
  return (
    <div>
      <ModaluserDemerit />
      <u2 className={styles.DemeritGuide}>
        현재 누적 벌점은 {props.userDemerit}점
      </u2>
      <h1></h1>
    </div>
  );
}

const _userDemerit = [{ Demerit: '100' }];

function ModaluserDemerit() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className={styles.modaluserDemerit}>
        ⨀ 벌점 시스템 더 알아보기
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.Guidemodal}
      >
        <h1 className={styles.GuideText}>벌점</h1>
        <table
          border='1'
          bordercolor='black'
          cellspacing='4'
          className={styles.Demerittable}
        >
          <caption align='center'>
            <h3>벌점 부여 기준</h3>
          </caption>
          <tr align='center'>
            <th scope='col'>항목</th>
            <th scope='col'>점수</th>
          </tr>
          <tr align='center'>
            <td>과도한 욕설</td>
            <td>1</td>
          </tr>
          <tr align='center'>
            <td>성적(性的) 발언</td>
            <td>1</td>
          </tr>
          <tr align='center'>
            <td>성적(成績) 발언</td>
            <td>1</td>
          </tr>
          <tr align='center'>
            <td>혐오 사진</td>
            <td>1</td>
          </tr>
          <tr align='center'>
            <td>도배글</td>
            <td>3</td>
          </tr>
          <tr align='center'>
            <td>허위사실 유포</td>
            <td>3</td>
          </tr>
          <tr align='center'>
            <td>교직원에 대한 비하적 표현</td>
            <td>5</td>
          </tr>
        </table>
        <table
          border='1'
          bordercolor='black'
          cellspacing='4'
          className={styles.Demerittable2}
        >
          <caption align='center'>
            <h3>누적 벌점에 따른 처벌</h3>
          </caption>
          <tr align='center'>
            <th scope='col'>점수</th>
            <th scope='col'>처벌</th>
          </tr>
          <tr align='center'>
            <td>1 ~ 2</td>
            <td>12시간 정지</td>
          </tr>
          <tr align='center'>
            <td>3 ~ 5</td>
            <td>하루</td>
          </tr>
          <tr align='center'>
            <td>6 ~ 10</td>
            <td>3일</td>
          </tr>
          <tr align='center'>
            <td>10~20</td>
            <td>일주일</td>
          </tr>
          <tr align='center'>
            <td>20 초과</td>
            <td>영구 정지, 선생님께 보고됨</td>
          </tr>
        </table>
        <div className={styles.DemeritText}>
          벌점은 1년 단위로 누적되며, 벌점을 받으면 누적 벌점에 해당하는 처벌을
          받게 됩니다.
        </div>
        <div className={styles.DemeritText}>
          마이페이지에서 내가 받은 벌점을 알 수 있습니다.
        </div>
        <div className={styles.DemeritText}>
          또한 극도로 유해한 글은 벌점과 무관하게 선생님께 회부될 수 있습니다.
          이 점 유의해주세요.
        </div>
        <button className={styles.UserDemeritButton} onClick={closeModal}>
          닫기
        </button>
      </Modal>
    </div>
  );
}

function UserDemeritBox() {
  const [userDemerit, setuserDemerit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setuserDemerit(_userDemerit);
    }, 1000);
  }, []);

  return (
    <div>
      <h1 className={styles.MySelectTitle}>누적 벌점</h1>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          userDemerit.map((userDemerit, index) => {
            return (
              <div>
                <UserDemerit key={index} userDemerit={userDemerit.Demerit} />
                <DemeritList />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function MyPage() {
  useEffect(() => {
    (async () => {
      const formData = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        crecredentials: 'include',
      };

      const res = await (await fetch('/check_session', formData)).json();
      const resl = await (
        await fetch(`/user/info?id=${res.content.id}`, formData)
      ).json();

      console.log(resl);
      data = await resl.content;
      console.log(data);
    })();
  }, []);

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
