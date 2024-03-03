import React, {useEffect,useState} from 'react';
import './PostList.module.css';
import { useNavigate } from 'react-router-dom';

const PostlistElement = (props) => {

  const navigate = useNavigate();

  const handleClickButton = (e) => {
    navigate("/postpage?uid=" + props.post.uid);
  };

  let board = props.post;

  return (
    <div key={props.key} className='Post' onClick={handleClickButton}>
      <div className='post1'> <li> {board.title} </li></div>
      <div className='post2'> <li> {board.like} </li></div>
      <div className='post3'> <li> {board.view} </li></div>
    </div>
  );
}

const PostBox = (props) => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const getPostList = async (author) => {
    const resp = await fetch(`/post/search/author?author=${author}`)
    let json = await resp.json()
    console.log(json.content)
    setPostList(json.content);
  }

  useEffect(async () => {
    (async () => {
      await getPostList(props.authorId);
      setIsLoading(false);
    })();
  }, [props]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (  
    <div>
      <div className='lists'>

        <ul className='PostList'>
          
          <div className='PostA'>
            <div className='post1'>제목</div>
            <div className='post2'>추천</div>
            <div className='post3'>조회</div>
          </div>


        {postList.map((board, index) => (
          <PostlistElement key={index} post={board}></PostlistElement>
        ))}
        </ul>
      </div>

    </div>
  );
};

function PostList(props) {
  return (
    <div>
      <PostBox authorId={props.authorId}/>
    </div>
  );
}

export default PostList;