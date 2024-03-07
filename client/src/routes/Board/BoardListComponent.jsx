import { useEffect, useState } from "react";
import TextSearch from '../../layout/TextSearch';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import BasicPagination from "../../routes/Board/test"

export default function BoardListComponent({boardList, limit, offset}) {

  const [sResult, setsResult] = useState([]);
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  
  const onChangeUid = (uid) => {
      navigate(`/postpage`, { state: uid });
  };

  const search = (keyword, start, end) => {
    fetch(
      `http://app.ishs.co.kr/post/search?keyword=${keyword}&start=${start}&end=${end}`
    ).then((res) => {
      res.json().then((data) => {
        setsResult(data.content);
        console.log(data.content);
      });
    });
  };

  // sort boardlist by created date
  boardList.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
  });

  console.log(offset);

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
              if (content.length > 2) search(content, 0, 1);
            }}
          >
            검색
          </button>
          <input
            className='input'
            onInput={(e) => {
              if (e.target.value.length > 2) setContent(e.target.value);
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

            {boardList.slice(offset, offset + limit).map((board) => (
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

            {sResult.map((result) => (
              <li>{result.title}</li>
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