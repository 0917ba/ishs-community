import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';

import Main from './routes/main/main.jsx';

import Signup from './routes/signup/signup';
import SignupSuccess from './routes/signup/signupSuccess';
import Signin from './routes/signin/signin';
import FindPw from './routes/signin/findPW';

import BoardList from './routes/Board/BoardList';
import PostPage from './routes/postpage/PostPage';

import MyPage from './routes/mypage/MyPage';

import BigBangBar from './component/BigBang/BingBang';

import PostTest from './routes/PostTest';
import Write from './routes/Write/Write';

import Preparing from './routes/preparing/preparing.jsx';

function App() {
  <Route path='/' element={<Main />} />;
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/register/success' element={<SignupSuccess />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/findpw' element={<FindPw />} />

        <Route path='/BigBang' element={<BoardList />} />
        <Route path='/postpage' element={<PostPage />} />

        <Route path='/mypage' element={<MyPage />} />

        <Route path='/post/bigbang' element={<BigBangBar />} />

        <Route path='/PostTest' element={<PostTest />} />

        <Route path='/Write' element={<Write />} />

        <Route path='/preparing' element={<Preparing />} />
      </Routes>
    </Router>
  );
}

export default App;
