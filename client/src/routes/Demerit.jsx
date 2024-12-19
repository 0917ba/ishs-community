import React, { useEffect, useState } from 'react';
import TextSearch from '../layout/TextSearch';
import { useNavigate } from 'react-router-dom';
import './Demerit.module.css';
// import Posts from './Posts';
import styled from "styled-components";
import BasicPagination from "./Board/old_version/test"

const DemeritList = () => {
    const [boardList, setBoardList] = useState([]);
    const [uidList, setUidList] = useState([]);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(3);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [postList, setPostList] = useState([]);
    const [sResult, setsResult] = useState([]);
    const [content, setContent] = useState("");

    const getPostList = async (start, end) => {
        const resp = await fetch(`http://app.ishs.co.kr/post/list?start=${start}&end=${end}`)
        let json = await resp.json()
        console.log(json.content)
        setPostList(json.content);
        setUidList(json.content.map((postList) => postList.uid));

    }

    const onChangeUid = (uid) => {
        navigate(`/postpage`, { state: uid });
    };

    const search = (keyword, start, end) => {
        fetch(`http://app.ishs.co.kr/post/search?keyword=${keyword}&start=${start}&end=${end}`).then(res => {
            res.json().then(data => {
                setsResult(data.content)
                console.log(data.content)
            })
        })
    }

    useEffect(() => {
        // getPostList(0, 20);
    }, []);

    let [count, setCount] = useState(1);



    return (
        <Layout>
            <main>
                <>
                    <div className='box1'>

                        <div className='lists'>
                            <ul className='PostList'>

                                <div className='PostA'>
                                    <div className='post1'>벌점사항</div>
                                    <div className='post2'>날짜</div>
                                    <div className='post3'>벌점</div>
                                </div>


                                {postList.slice(offset, offset + limit).map((board) => (
                                    <div className='Post'>
                                        <div className='post1'> <li> {board.title} </li></div>
                                        <div className='post2'> <li> {board.like} </li></div>
                                        <div className='post3'> <li> {board.view} </li></div>
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

            <footer>
                <BasicPagination
                    total={boardList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </footer>
        </Layout>
    );
}

const Layout = styled.div`
  position: relative;
  right: 1vw;
`;

export default DemeritList;
