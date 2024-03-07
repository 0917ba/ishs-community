import Header from './Header';
import Navigation from './Navigation';

export default function NavBar({isLogin}) {
  return (
    <div className="h-fit flex flex-col ">
      <Header isLogin={isLogin}/>
      <Navigation />
    </div>
  );
}
