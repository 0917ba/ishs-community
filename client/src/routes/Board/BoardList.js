import React, { useEffect, useState } from 'react';
import TitleBigBang from '../../layout/titleBigBang';
import TextSearch from '../../layout/TextSearch';
import { useNavigate } from 'react-router-dom';
import './BoardList.css';
import styled from "styled-components";
import BoardListComponent from './BoardListComponent';

const BoardList = () => {
  
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  let [count, setCount] = useState(1);
  const [boardList, setBoardList] = useState([]);
  const [uidList, setUidList] = useState([]);

  const getBoardList = async (start, end) => {
    const resp = await fetch(
      `/post/list?start=${start}&end=${end}`
    );
    let json = await resp.json();
    console.log(json.content);
    setBoardList(json.content);
    setUidList(json.content.map((board) => board.uid));
  };

  const search = (keyword, start, end) => {
      fetch(
        `/post/search/keyword?keyword=${keyword}&start=${start}&end=${end}`
      ).then((res) => {
        res.json().then((data) => {
          setBoardList(data.content);
        });
      });
  };

  useEffect(() => {
    getBoardList(0, 10000);
  }, []);

  return (
    <Layout>
      <header>
        <h1>게시물 목록</h1>
      </header>

      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>

      <main>
        <>
        <TitleBigBang />

        <div className='box1'>
          <div className='search1'>
            <TextSearch />
            <button
              className='btnSearch'
              onClick={() => {
                if (content.length > 2) search(content, 0, 10);
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
          <div className='dot1'></div>
          <div className='dot2'></div>
          <div className='dot3'></div>

          <BoardListComponent boardList={boardList} limit={limit}/>

          {/* <div className='lists'>
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
            </ul>
          </div> */}
        </div>
      </>
      </main>

      {/* <footer>
        <BasicPagination 
          total={boardList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer> */}
    </Layout>
  );
}

const Layout = styled.div`

`;

export default BoardList;
