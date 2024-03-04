import { useNavigate } from 'react-router-dom';

function SignupSuccess() {
  const navigate = useNavigate();

  const onClickSignup = () => {
    navigate('/login');
  };
  return (
    <div>
      <h1>회원가입이 완료되었습니다.</h1>
      <button onClick={onClickSignup}>로그인 하러 가기</button>
    </div>
  );
}

export default SignupSuccess;
