import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './routes/main/main';
import Profile from './routes/profile/profile';
import Signup from './routes/signup/signup';
import Signin from './routes/signin/signin';
import PostList from './routes/bigbang/PostList';
import SignupSuccess from './routes/signup/signupSuccess';
import Special from './routes/signup/special';
import FindPw from './routes/signin/findPW';

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
      </Routes>
    </Router>
  );
}

export default App;
