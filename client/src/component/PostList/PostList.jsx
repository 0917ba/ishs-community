import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostList.module.css';
import PostListComponent from './PostListComponent';
import BasicPagination from "../../routes/Board/test"

const PostBox = ({authorId}) => {
  const [postList, setPostList] = useState([]);
  const [uidList, setUidList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  
  const getPostList = async (author) => {
    const resp = await fetch(`/post/search/author?author=${author}`)
    let json = await resp.json()
    console.log(json.content)
    setPostList(json.content);
    setUidList(json.content.map((board) => board.uid));
  }

  console.log(uidList);
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
      <PostListComponent boardList={postList} limit={limit} offset={offset} />
      <footer>
        <BasicPagination 
          total={postList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
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