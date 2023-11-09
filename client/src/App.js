import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './routes/main/main';
import Profile from './routes/profile/profile';
import Signup from './routes/signup/signup';
import Signin from './routes/signin/signin';
import BigBang from './routes/bigbang/post';

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
        <Route path='/signin' element={<Signin />} />
        <Route path='/bigbang/post' element={<BigBang />} />
      </Routes>
    </Router>
  );
}

export default App;
