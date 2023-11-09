import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./component/PostList/PostList";
import BigBangBar from "./component/BigBang/BingBang";
import MainMy from "./component/MainMy/MainMy";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/post/list" element={<PostList />} />
        <Route path="/post/bigbang" element={<BigBangBar />} />
        <Route path="/post/mainmy" element={<MainMy />} />
      </Routes>
    </Router>
  );
}

export default App;
