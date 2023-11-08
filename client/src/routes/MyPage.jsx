import styles from './MyPage.module.css';
import { useEffect, useState } from "react";

function Post(props) {
  return <div className={styles.Post}>
    <div>{props.title}</div>
    <div>{props.content}</div>
  </div>
}

const _posts = [
  { title: 'hello', content: 'world' },
  { title: 'ishs', content: 'world' },
  { title: 'raibit', content: 'world' },
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
    <div>Post Box</div>
    {
      isLoading ? <div>Loading...</div> :
      posts.map((post, index) => {
        return <Post key={index} title={post.title} content={post.content} />
      })
    }
  </div>
}

function MoveMyPage(props){
  return <div className={styles.Post}>
    <div>{props.moveMyPage}</div>
  </div>
}

const _pages = [
  { pageName: '아이디/학번'},
  { pageName: '누적 벌점'},
  { pageName: '유저 계급'},
  { pageName: '이메일'},
  { pageName: '보유 ATP'},
]

function MovePageBox() {
  const [pages, setpages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setpages(_pages);
    }, 1000);
  }, []);

  return <div className={styles.PostBox}>
    <img src="img/myIcon.png" />
    <div>Post Box</div>
    {
      isLoading ? <div>Loading...</div> :
      pages.map((pages, index) => {
        return <MoveMyPage key={index} moveMyPage={pages.pageName}/>
      })
    }
  </div>
}

function MyPage() {
  return (
    <div className={styles.Container}>
      <img src="img/log_ishs_image.png" />
      <MovePageBox />
    </div>
  );
}

export default MyPage;
export { PostBox };