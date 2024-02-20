import styles from './main.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
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
      //const res = await fetch(`serverUrl` + `/check_session`, formData);
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
    //const res = await fetch(`serverUrl` + `/signout`, formData);
  };

  return (
    <button type='button' onClick={onClickSignOut}>
      로그아웃
    </button>
  );
}

export default Main;
