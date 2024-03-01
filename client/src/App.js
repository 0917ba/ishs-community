import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';

import Home from './routes/Home/Home';
import Signup from './routes/signup/signup';
import SignupSuccess from './routes/signup/signupSuccess';
import Signin from './routes/signin/signin';
import FindPw from './routes/signin/findPW';
import PostList from './component/PostList/PostList';
import BigBangBar from './component/BigBang/BingBang';
import MainMy from './component/MainMy/MainMy';
// import PostList from "./routes/PostList";
import MyPage from './routes/mypage/MyPage';
import PostPage from './routes/postpage/PostPage';

import BoardList from './routes/Board/BoardList';
import MyList from './routes/mylist/MyList';
import PostTest from './routes/PostTest';

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
        <Route path='/register' element={<Signup />} />
        <Route path='/register/success' element={<SignupSuccess />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/findpw' element={<FindPw />} />
        <Route path='/post/list' element={<PostList />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/post/bigbang' element={<BigBangBar />} />
        <Route path='/post/mainmy' element={<MainMy />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/MyList' element={<MyList />} />
        <Route path='/Board' element={<BoardList />} />
        <Route path='/postpage' element={<PostPage />} />
        <Route path='/PostTest' element={<PostTest />} />
      </Routes>
    </Router>
  );
}

export default App;
