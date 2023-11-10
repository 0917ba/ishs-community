import { useNavigate } from 'react-router-dom';

function FindPw() {
  const navigate = useNavigate();

  const onClickMain = () => {
    navigate('/main');
  };

  return (
    <div>
      <button onClick={onClickMain}>홈화면으로 가기</button>

      <h1>아직 구현되지 않은 기능입니다.</h1>
    </div>
  );
}

export default FindPw;
