import React, { useEffect, useState } from 'react';
import TitleBigBang from '../../layout/titleBigBang';
import TextSearch from '../../layout/TextSearch';
import { useNavigate } from 'react-router-dom';
import './BoardList.css';
import BasicPagination from './test';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import BoardListComponent from './BoardListComponent';

const BoardList = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  let [count, setCount] = useState(1);
  const [boardList, setBoardList] = useState([]);
  const [uidList, setUidList] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const getBoardList = async (start, end) => {
    const resp = await fetch(`/post/list?start=${start}&end=${end}`);
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
    <div className='scroll'>
      <div className='body'>
        <Header />

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

              <BoardListComponent
                boardList={boardList}
                limit={limit}
                offset={offset}
              />

              <label className='PostNumber'>
                페이지 당 표시할 게시물 수 :&nbsp;&nbsp;&nbsp;
                <select
                  type='number'
                  value={limit}
                  onChange={({ target: { value } }) => setLimit(Number(value))}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </label>
            </div>
          </>
        </main>

        <footer>
          <BasicPagination
            total={boardList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      </div>

      <Footer />
    </div>
  );
};

export default BoardList;
