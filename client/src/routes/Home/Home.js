import React from 'react';
import Route from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    (async () => {
      const formData = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      };
      const res = await fetch(`/check_session`, formData);
      const data = await res.json();
      console.log(data);
    })();
  }, []);

  const navigate = useNavigate();

  const onClickSignOut = async () => {
    console.log('signout');
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    };

    const resl = await fetch(`/signout`, formData);
  };

  return (
    <button type='button' onClick={onClickSignOut}>
      로그아웃
    </button>
  );
}

export default Home;
