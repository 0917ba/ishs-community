import styles from './profile.module.css';
import { useEffect } from 'react';

function Profile() {
  const [loginState, setLoginState] = useState(false);
  useEffect(() => {
    (async () => {
      const formData = {
        mgitethod: 'GET',
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
        body: JSON.stringify({}),
      };
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      res = await fetch(`serverUrl` + `/checksession`, formData);
    })();
    if (res.status === 200) {
      setLoginState(true);
    }
    if (res.status === 400) {
      setLoginState(false);
    }
  }, []);

  if (loginState === false) {
    return (
      <div>
        <h1>다음에 다시 도전해보세요!</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>프로필</h1>
      </div>
    );
  }
}

export default Profile;
