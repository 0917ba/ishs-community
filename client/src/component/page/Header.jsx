import SearchBar from './SearchBar';
import Ddate from './Dday';
import mainLogo from '../img/mainLogo.jpg';
import logISHS from '../img/logISHS.png';

export default function Header({ isLogin }) {
  const onClickLogout = async () => {
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    };
    await fetch('/signout', formData);
    window.location.reload();
  };

  return (
    <div className='flex flex-col md:basis-[7.5rem] basis-24 justify-center'>
      <div className='flex'>
        <div className='basis-1/3 flex justify-center gap-3 '>
          <div className='md:w-[85px] w-[55px]'>
            <a href='/main'>
              <img src={mainLogo} alt='logo' />
            </a>
          </div>
          <div className='md:w-[200px] w-[150px]'>
            <a href='/'>
              <img src={logISHS} alt='logo' />
            </a>
          </div>
        </div>
        <div className='xl:basis-1/3 basis-2/3 flex flex-col justify-center px-3'>
          <SearchBar />
        </div>
        <div className='xl:flex basis-1/3 hidden justify-center relative'>
          <div className='relative right-8 top-2'>
            <Ddate />
          </div>
        </div>
      </div>
      <div className='absolute flex gap-1 top-2 right-2'>
        {isLogin ? (
          <div>
            <a href='/mypage'>마이페이지</a>
            <span>/</span>
            <button onClick={onClickLogout}>로그아웃</button>
          </div>
        ) : (
          <div>
            <a href='/login'>로그인</a>
            <span>/</span>
            <a href='/register'>회원가입</a>
          </div>
        )}
      </div>
    </div>
  );
}
