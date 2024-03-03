import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TitleBigBang from '../../layout/titleBigBang';
import TextSearch from '../../layout/TextSearch';
import { useNavigate } from 'react-router-dom';
import './BoardList.css';

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [uidList, setUidList] = useState([]);
  const [sResult, setsResult] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const getBoardList = async (start, end) => {
    const resp = await fetch(
      `http://app.ishs.co.kr/post/list?start=${start}&end=${end}`
    );
    let json = await resp.json();
    console.log(json.content);
    setBoardList(json.content);
    setUidList(json.content.map((board) => board.uid));
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

  useEffect(() => {
    getBoardList(0, 20);
  }, []);

  let [count, setCount] = useState(1);

  const onChangeUid = (uid) => {
    navigate(`/postpage`, { state: uid });
  };

  return (
    <>
      <TitleBigBang />

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
        <div className='dot1'></div>
        <div className='dot2'></div>
        <div className='dot3'></div>

        <div className='lists'>
          <ul className='PostList'>
            <div className='PostA'>
              <div className='post1'>제목</div>
              <div className='post2'>추천</div>
              <div className='post3'>조회</div>
            </div>

            {boardList.map((board) => (
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
  );
};

export default BoardList;
