import { useEffect, useState } from "react";
import BasicPagination from "./test";
import { useNavigate } from "react-router-dom";

export default function BoardListComponent({boardList, limit}) {

    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const onChangeUid = (uid) => {
        navigate(`/postpage`, { state: uid });
    };

    // sort boardlist by created date
    boardList.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div>
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
            </ul>
          </div>

        <footer>
        <BasicPagination 
          total={boardList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
      </div>
    )
}