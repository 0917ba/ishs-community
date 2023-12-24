import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './routes/main/main';
import Profile from './routes/profile/profile';
import Signup from './routes/signup/signup';
import Signin from './routes/signin/signin';
import SignupSuccess from './routes/signup/signupSuccess';
import Special from './routes/signup/special';
import FindPw from './routes/signin/findPW';
import PostList from "./component/PostList/PostList";
import BigBangBar from "./component/BigBang/BingBang";
import MainMy from "./component/MainMy/MainMy";
// import PostList from "./routes/PostList";
import MyPage from "./routes/MyPage";

function App() {
  function user() {
    //const params = useParams();
    //const userId = params.id;
  }
  function post() {
    //const params = useParams();
    //const postId = params.id;
  }

  return (
    <Router>
      <Routes>
        <Route path='/main' element={<Main />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signup/success' element={<SignupSuccess />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/post/list' element={<PostList />} />
        <Route path='/special' element={<Special />} />
        <Route path='/findpw' element={<FindPw />} />
        <Route path="/post/list" element={<PostList />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/post/bigbang" element={<BigBangBar />} />
        <Route path="/post/mainmy" element={<MainMy />} />
      </Routes>
    </Router>
  );
}

export default App;
