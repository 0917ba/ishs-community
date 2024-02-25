import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';

import Home from './routes/Home/Home';
import Signup from './routes/signup/signup';
import SignupSuccess from './routes/signup/signupSuccess';
import Signin from './routes/signin/signin';
import FindPw from './routes/signin/findPW';
import PostList from './component/PostList/PostList';
import MyPage from './routes/mypage/MyPage';
import BigBangBar from './component/BigBang/BingBang';
import MainMy from './component/MainMy/MainMy';
import MyList from './routes/mylist/MyList';
import BoardList from './routes/Board/BoardList';
import BoardDetail from './routes/Board/BoardDetail';
import PostPage from './routes/PostPage';
import Special from './routes/signup/special';

import CheckSessionTest from './routes/CheckSessionTest';

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
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signup/success' element={<SignupSuccess />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/findpw' element={<FindPw />} />
        <Route path='/post/list' element={<PostList />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/post/bigbang' element={<BigBangBar />} />
        <Route path='/post/mainmy' element={<MainMy />} />
        <Route path='/mylist' element={<MyList />} />
        <Route path='/board' element={<BoardList />} />
        <Route path='/board/detail/:uid' element={<BoardDetail />} />
        <Route path='/post/list' element={<PostList />} />
        <Route path='/PostTest' element={<PostPage />} />
        <Route path='/checksessiontest' element={<CheckSessionTest />} />
      </Routes>
    </Router>
  );
}

export default App;
