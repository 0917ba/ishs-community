import React, {useEffect,useState} from 'react';
import './PostList.module.css';
import BoardListComponent from '../../routes/Board/BoardListComponent';

const PostBox = ({authorId}) => {
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
      await getPostList(authorId);
      setIsLoading(false);
    })();
    // setIsLoading(false);
    // getPostList(props.authorId);
  }, [authorId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (  
    <div>
      <BoardListComponent boardList={postList} limit={5}/>
    </div>
  );
};

function PostList({authorId}) {
  return (
    <div>
      <PostBox authorId={authorId}/>
    </div>
  );
}

export default PostList;