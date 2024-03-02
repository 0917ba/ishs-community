import styles from './MyPage.module.css';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DemeritList from '../Demerit';
import MainPageBox from '../../component/mypage/MainPageBox';
import MovePageBox from '../../component/mypage/MovePageBox';
import Notification from '../../component/mypage/Notification';
import SelectPageBox from '../../component/mypage/user/info/SelectPageBox';

function MyPage() {

  let [data, setData] = useState({});

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
      // const resl = await (
      //   await fetch(`/user/info?id=${res.content.id}`, formData)
      // ).json();

      console.log(res);
      console.log(res.content);
      setData(res.content);
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
            <SelectPageBox data={data}/>
          </div>
        </div>
      </div>
    </body>
  );
}

export default MyPage;
