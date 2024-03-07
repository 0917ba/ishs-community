import React, { useEffect, useState } from 'react';
import TextSearch from '../../layout/TextSearch';
import { useNavigate } from 'react-router-dom';
import './PostList.module.css';
import BoardListComponent from '../../routes/Board/BoardListComponent';
import styled from 'styled-components';

const PostBox = ({authorId}) => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  
  const getPostList = async (author) => {
    const resp = await fetch(`/post/search/author?author=${author}`)
    let json = await resp.json()
    console.log(json.content)
    setPostList(json.content);
  }

  useEffect(() => {
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
      <BoardListComponent boardList={postList} limit={5} offset={offset}/>
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

const Layout = styled.div`
  position: relative;
  right: 1vw;
`;

export default PostList;