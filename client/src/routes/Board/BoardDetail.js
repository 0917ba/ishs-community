import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function BoardDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState('');

  console.log(location);
  console.log(typeof location.state);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://app.ishs.co.kr/post?uid=${location.state}`
      );

      console.log(res);
      //const serverUrl = process.env.REACT_APP_SERVER_URL;
      //const res = await fetch(`serverUrl` + `/post?` + `uid=${location.uid}`);
    })();
  }, []);

  return (
    <div>
      <h1>BoardDetail</h1>
    </div>
  );
}

export default BoardDetail;
