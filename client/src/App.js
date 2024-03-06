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
import Main from './routes/main/main.jsx';

function App() {
  <Route path='main' element={<Main />} />;
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/register/success' element={<SignupSuccess />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/findpw' element={<FindPw />} />
        <Route path='/post/list' element={<PostList />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/post/bigbang' element={<BigBangBar />} />
        <Route path='/post/mainmy' element={<MainMy />} />
        <Route path='/MyList' element={<MyList />} />
        <Route path='/BigBang' element={<BoardList />} />
        <Route path='/postpage' element={<PostPage />} />
        <Route path='/PostTest' element={<PostTest />} />
        <Route path='/' element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
