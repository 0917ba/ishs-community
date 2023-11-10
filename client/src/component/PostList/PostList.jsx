import styles from './PostList.module.css';
import { useEffect, useState } from "react";

function Post(props) {
  return <div className={styles.Post}>
    <div style={{ display: 'inline' }}>
      <div>{props.title}</div>
      <img src="/viewer_icon.png" alt="wait plz" />
      {/* <div>{props.viewer}</div>
      <img src="/coment_icon.png" alt="wait plz" />
      <div>{props.coment}</div>
      <div>{props.end}</div>
      <div>{props.apo}</div>
      <div>{props.time}</div> */}
    </div>

  </div>
}

const _posts = [
  { title: 'hello', viewer: '13', coment: '2', end: '4', apo: '2', time: '5시간 전' },
  { title: 'ishs', viewer: '452', coment: '49', end: '4', apo: '2', time: '5시간 전' },
]
function PostBox() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setPosts(_posts);
    }, 1000);
  }, []);

  return <div className={styles.PostBox}>
    {
      isLoading ? <div>Loading...</div> :
        posts.map((post, index) => {
          return <Post key={index} title={post.title} viewer={post.viewer} content={post.content} end={post.end} apo={post.apo} time={post.time} />
        })
    }
  </div>
}

function PostList() {
  return (
    <div>
      <div className={styles.Container}>
        <PostBox />
      </div>
    </div>
  );
}

export default PostList;
export { PostBox };

