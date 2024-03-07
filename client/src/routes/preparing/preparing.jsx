import { useNavigate } from 'react-router-dom';

function Preparing() {
  const navigate = useNavigate();

  const onClickTomain = () => {
    navigate(`/`);
  };

  return (
    <div>
      <h1>아직 준비되지 않은 서비스 입니다.</h1>
      <button onClick={onClickTomain}>메인으로</button>
    </div>
  );
}

export default Preparing;
