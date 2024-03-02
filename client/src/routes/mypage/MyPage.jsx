import styles from './MyPage.module.css';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DemeritList from '../Demerit.';
import PostList from '../../component/PostList/PostList';
import MainPageBox from '../../component/mypage/MainPageBox';
import MoveMyPage from '../../component/mypage/MoveMyPage';
import MovePageBox from '../../component/mypage/MovePageBox';
import MemberInformationBtn from '../../component/mypage/MemberInformationBtn';
import Notification from '../../component/mypage/Notification';
import HelpUserPage from '../../component/mypage/help/HelpUserPage';
import ModaluserPermissions from '../../component/mypage/ModelUserPermissions';
import SelectPageBox from '../../component/mypage/SelectPageBox';

let data = {};


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
