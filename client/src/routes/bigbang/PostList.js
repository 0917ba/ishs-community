import styles from './PostList.module.css';
import { useEffect, useState } from 'react';

function Post(props) {
  return (
    <div className={styles.Post}>
      <div>{props.title}</div>
      <div>{props.content}</div>
    </div>
  );
}

const _posts = [
  { title: 'hello', content: 'world' },
  { title: 'ishs', content: 'world' },
  { title: 'raibit', content: 'world' },
];
function PostBox() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const formData = {
        mgitethod: 'GET',
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
        body: JSON.stringify({}),
      };
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      res = await fetch('serverUrl', formData);
    })();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setPosts(_posts);
    }, 1000);
  }, []);

  return (
    <div className={styles.PostBox}>
      <div>Post Box</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        posts.map((post, index) => {
          return <Post key={index} title={post.title} content={post.content} />;
        })
      )}
    </div>
  );
}

function PostList() {
  return (
    <div className={styles.Container}>
      <h1>Post List</h1>
      <PostBox />
    </div>
  );
}

export default PostList;
export { PostBox };
