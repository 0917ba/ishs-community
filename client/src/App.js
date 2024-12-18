import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';

// import Main from './routes/main/main.jsx';

// import Signup from './routes/signup/signup';
import SignupSuccess from './routes/signup/signupSuccess';
// import Login from './routes/signin/signin';
import FindPw from './routes/signin/findPW';

import PostPage from './routes/postpage/PostPage';
// import BoardDetail from './routes/postpage/BoardDetail.jsx';

import MyPage from './routes/mypage/MyPage';

import BigBangBar from './component/BigBang/BingBang';

import PostTest from './routes/PostTest';
import Write from './routes/Write/Write';

import Preparing from './routes/preparing/preparing.jsx';
import BigbangPage from './routes/Board/Bigbang2.jsx';
import Main2 from './routes/main/Main2.jsx';
import Login2 from './routes/signin/Login.jsx';
import Signup2 from './routes/signup/Signup2.jsx';
import BigbangPage2 from './routes/Board/ver2/BigbangTest.jsx';
import BoardDetail from './routes/postpage/old_version/BoardDetail.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main2 />} />
        <Route path='/register' element={<Signup2 />} />
        <Route path='/register/success' element={<SignupSuccess />} />
        <Route path='/login' element={<Login2 />} />
        <Route path='/findpw' element={<FindPw />} />

        <Route path='/BigBang' element={<BigbangPage2 />} />
        <Route path='/postpage' element={<PostPage />} />
        <Route path='/board/detail' element={<BoardDetail />} />

        <Route path='/mypage' element={<MyPage />} />

        <Route path='/post/bigbang' element={<BigBangBar />} />

        <Route path='/PostTest' element={<PostTest />} />

        <Route path='/Write' element={<Write />} />

        <Route path='/preparing' element={<Preparing />} />

        {/* <Route path='/testpage' element={<BigbangPage/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
