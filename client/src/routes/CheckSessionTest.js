import React, { useEffect } from 'react';

function CheckSessionTest() {
  useEffect(() => {
    (async () => {
      const resp = await fetch('http://app.ishs.co.kr/check_session', {
        method: 'GET',
      });
      const data = await resp.json();
      console.log(data);
    })();
  }, []);

  return (
    <div>
      <h1>CheckSessionTest!</h1>
    </div>
  );
}

export default CheckSessionTest;
