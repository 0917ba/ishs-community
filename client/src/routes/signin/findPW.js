// import { useNavigate } from 'react-router-dom';

// function FindPw() {
//   useEffect(() => {
//     (async () => {
//       const formData = {
//         mgitethod: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           withCredentials: true,
//         },
//         body: JSON.stringify({}),
//       };
//       const serverUrl = process.env.REACT_APP_SERVER_URL;
//       res = await fetch(`serverUrl` + `/check_session`, formData);
//     })();
//   }, []);
//   const navigate = useNavigate();

//   const onClickMain = () => {
//     navigate('/main');
//   };

//   return (
//     <div>
//       <button onClick={onClickMain}>홈화면으로 가기</button>

//       <h1>아직 구현되지 않은 기능입니다.</h1>
//     </div>
//   );
// }

// export default FindPw;
