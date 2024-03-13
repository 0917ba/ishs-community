import { useEffect, useState } from "react";
import TextSearch from '../../layout/TextSearch';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export default function PostListComponent({boardList, limit, offset}) {

  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  
  const onChangeUid = (uid) => {
      navigate(`/board/detail`, { state: uid });
  };

  const search = (content, start, end) => {
    let result = [];
    for (let i = start; i < end; i++) {
        if (boardList[i].title.includes(content)) {
            result.push(boardList[i]);
        }
    }
    setPosts(result)
  }

  // sort boardlist by created date
  boardList.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    setPosts(boardList);
  }, [boardList]);

  return (
    <Layout>
    <header>
      <Title>내 커뮤니티 글</Title>
    </header>
    <main>
      <>
      <div className='box1'>
        <div className='search1'>
          <TextSearch />
          <button
            className='btnSearch'
            onClick={() => {
              search(content, 0, boardList.length);
            }}
          >
            검색
          </button>
          <input
            className='input'
            onInput={(e) => {
              setContent(e.target.value);
            }}
          ></input>
        </div>

        <div className='empty'></div>
        <div className='empty'></div>

        <div className='lists'>
          <ul className='PostList'>
            <div className='PostA'>
              <div className='post1'>제목</div>
              <div className='post2'>추천</div>
              <div className='post3'>조회</div>
            </div>

            {posts.slice(offset, offset + limit).map((board) => (
              <div className='Post'>
                <div className='post1'>
                  <li
                    className='pointer'
                    onClick={() => onChangeUid(board.uid)}
                  >
                    {board.title}
                  </li>
                </div>
                <div className='post2'>
                  {' '}
                  <li> {board.like} </li>
                </div>
                <div className='post3'>
                  {' '}
                  <li> {board.view} </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
    </main>
    
    </Layout>
  )
}

const Layout = styled.div`
  position: relative;
  right: 1vw;
`;

const Title = styled.div`
  position: relative;
  font-size: 3vmin;
`;