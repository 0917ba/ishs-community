import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./routes/PostList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/post/list" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;
