import styles from './MyPage.module.css';
import { useEffect, useState } from 'react';
import HeaderPost from '../../layout/HeaderPost'
import MovePageBox from '../../component/mypage/MovePageBox';
import Notification from '../../component/mypage/Notification';
import { useNavigate } from 'react-router-dom';

function MyPage() {

  let navigate = useNavigate();

  let [data, setData] = useState({});
  let [isLoading, setIsLoading] = useState(true);

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

      const res = await fetch('/check_session', formData)
      if (res.status === 200) {
        const resdata = await res.json();
        console.log(resdata);
        console.log(resdata.content);
        setData(resdata.content);
        setIsLoading(false);
      } else {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <div className={styles.static}>
        <HeaderPost />
        <div className={styles.BackGroundColor}></div>
        <Notification />
        <div className={styles.Myboxcontainer}>
          <div className={styles.relative}>
            <MovePageBox data={data}/>
          </div>
        </div>
      </div>
  );
}

export default MyPage;