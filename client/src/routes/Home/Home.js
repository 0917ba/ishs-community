import React from 'react';
import Route from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    (async () => {
      const formData = {
        mgitethod: 'GET',
      };

      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const res = await fetch(`serverUrl` + `/check_session`, formData);
    })();
  }, []);

  const navigate = useNavigate();

  const onClickSignOut = async () => {
    console.log('signin');
    const formData = {
      mgitethod: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const resl = await fetch(`serverUrl` + `/signout`, formData);
  };

  return (
    <button type='button' onClick={onClickSignOut}>
      로그아웃
    </button>
  );
}

export default Home;
