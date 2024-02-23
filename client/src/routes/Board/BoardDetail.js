import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function BoardDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState('');
  console.log(location.state);
  useEffect(() => {
    (async () => {
      const formData = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
        body: JSON.stringify({ uid: location.state }),
      };
      //const serverUrl = process.env.REACT_APP_SERVER_URL;
      const serverUrl = 'http://app.ishs.co.kr';
      const res = await fetch(serverUrl + `/post`, formData);
      console.log(res);
    })();
  }, []);

  return (
    <div>
      <h1>BoardDetail</h1>
    </div>
  );
}

export default BoardDetail;
