import { Link, useNavigate } from "react-router-dom";
import styles from './BigbangTest.module.css';
import { createRef, useEffect, useState } from "react";
import logoImage from '../../../assets/img/bigbang.png';
import BasicPagination from "./components/BasicPagination";

const Navbar = ({checked, setChecked, setBoardList, setBoardType}) => {

    const onChecked = (e) => {
        setChecked(e.target.checked);
        console.log(e.target.checked);
    }

    const search = (keyword, start, end) => {
        if (keyword === '') {
            fetch(`/post/list?start=${start}&end=${end}`).then((res) => {
                res.json().then((data) => {
                    setBoardList(data.content);
                });
            });
            return;
        }
        fetch(`/post/search/keyword?keyword=${keyword}&start=${start}&end=${end}`).then((res) => {
            res.json().then((data) => {
                setBoardList(data.content);
            });
        });
    };

    let ref1 = createRef();
    let ref2 = createRef();
    let ref3 = createRef();

    useEffect(() => {
        if (checked) {
            ref1.current.style.display = 'none';
            ref2.current.style.display = 'none';
            ref3.current.style.display = 'none';
        } else {
            ref1.current.style.display = 'block';
            ref2.current.style.display = 'block';
            ref3.current.style.display = 'block';
        }
    }, [checked]);

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            search(e.target.value, 0, 10000);
        }
    }

    const handleSelect = (e) => {
        setBoardType(e.target.value);
    }

    return (
        <div>
            <nav className={styles.navbar}>
                <ul className={styles.logo}>
                    <Link to="/"><img className={styles.pagelogo} src={logoImage} alt="/" /></Link>
                </ul>
                <ul>
                    <div className={styles.search}>
                        <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7792c1" viewBox="0 0 16 16"><g clipPath="url(#a)"><path fill="##s7792c1" d="M14 12.94 10.16 9.1c1.25-1.76 1.1-4.2-.48-5.78a4.49 4.49 0 0 0-6.36 0 4.49 4.49 0 0 0 0 6.36 4.486 4.486 0 0 0 5.78.48L12.94 14 14 12.94ZM4.38 8.62a3 3 0 0 1 0-4.24 3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24 3 3 0 0 1-4.24 0Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
                        <input type="text" placeholder="Search..." onKeyDown={onKeyDown}/>
                        <select onChange={handleSelect}>
                            <option value="ALL" selected>전체</option>
                            <option value="GRADE">학년</option>
                        </select>
                    </div>
                </ul>
                <ul className={styles.menu}>
                    <input type="checkbox" id="menuicon" className={styles.menuicon} onChange={onChecked}/>
                    <label htmlFor="menuicon" className={styles.menubar}>
                        <div ref={ref1} className={styles.bar}></div>
                        <div ref={ref2} className={styles.bar}></div>
                        <div ref={ref3} className={styles.bar}></div>
                    </label>
                </ul>
            </nav>
        </div>
    );
}

const Sidebar = ({checked}) => {

    let ref = createRef();
    
    useEffect(() => {
        if (checked) {
            ref.current.style.transform = 'translateX(-100%)';
            ref.current.style.transition = 'transform 0.3s ease-in-out';
        } else {
            ref.current.style.transform = 'translateX(0)';
            ref.current.style.transition = 'transform 0.3s ease-in-out';
        }
    }, [checked]);

    return (
        <nav ref={ref} className={styles.sidebar}>
            {/* exit button */}
            <label htmlFor="menuicon">
                <div className={styles.exit}>X</div>
            </label>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li className={styles.sidebtn}><Link to="/Write" state={{type: 'w'}}>글 작성하기</Link></li>
                <li className={styles.sidebtn}><Link to="/mypage">내가 쓴 글</Link></li>
                <li className={styles.sidebtn}><Link to="/mypage">내가 쓴 댓글</Link></li>
                <li className={styles.sidebtn}><Link to="/mypage">내가 추천한 글</Link></li>
            </ul>
        </nav>
    );
}

const TestBoardList = ({boardList, offset, limit}) => {

    return (
        <div>
            <div className={styles.boardlist}>
                {boardList.sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt);}).slice(offset, offset + limit).map((board) => (
                    <BoardComponent uid={board.uid} title={board.title} views={board.view} recommends={board.like} comments={board.comments} writer={board.author} thumbnail={"https://via.placeholder.com/150"} />
                ))}
            </div>
        </div>
    );
}

const BoardComponent = ({uid, title, views, recommends, comments, writer, thumbnail}) => {

    const navigate = useNavigate();

    const onClickBoard = (uid) => {
        console.log(uid);
        navigate(`/board/detail`, { state: uid });
    };

    return (
        <div className={styles.board}>
            <div className={styles.boardelement} onClick={() => {onClickBoard(uid)}}>
                <div className={styles.title}>{title}</div>
                <div className={styles.countContainer}>
                    <div className={styles.views}>조회 {views}</div>
                    <div className={styles.recommends}>
                        <img width="15" height="15" src="https://img.icons8.com/ios/50/737373/hearts--v1.png" alt="hearts--v1"/>
                        {recommends}
                    </div>
                    <div className={styles.comments}>
                        <img width="15" height="15" src="https://img.icons8.com/ios/50/737373/speech-bubble-with-dots--v1.png" alt="speech-bubble-with-dots--v1"/>
                        &nbsp;{comments}
                    </div>
                </div>
                <div className={styles.writer}>{writer}</div>
            </div>
            <div className={styles.thumbnail}>
                <img src={thumbnail} alt="thumbnail" />
            </div>
        </div>
    );
}

const BigBangPagination = ({limit, setLimit, total, setPage}) => {

    const updateLimit = (value) => {
        setLimit(Number(value))
        setPage(1)   
    }

    return (
        <div>
            <div className={styles.limitContainer}>
                <label>
                페이지 당 표시할 게시물 수:&nbsp;
                    <select
                        type="number"
                        value={limit}
                        onChange={({ target: { value } }) => updateLimit(value)}
                    >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </label>
            </div>
            <footer>
                <BasicPagination total={total} limit={limit} setPage={setPage} />
            </footer>
        </div>
    )
}



const BigbangPage = () => {

    let [checked, setChecked] = useState(false);
    const [boardList, setBoardList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [boardType, setBoardType] = useState('ALL')

    const getBoardList = async () => {
        const resp = await fetch(`/post/list?board=${boardType}`);
        let json = await resp.json();
        console.log(json.content);
        setBoardList(json.content);
    };

    useEffect(() => {
        getBoardList();
    }, []);

    useEffect(() => {
        getBoardList();
    }, [boardType]);

    return (
        <div className={styles.scroll}>
            <Navbar checked={checked} setChecked={setChecked} setBoardList={setBoardList} setBoardType={setBoardType}/>
            <Sidebar checked={checked}/>
            <TestBoardList boardList={boardList} boardType={boardType} offset={offset} limit={limit}/>
            <BigBangPagination limit={limit} setLimit={setLimit} total={boardList.length} setPage={setPage}/>
        </div>
    );
}

export default BigbangPage;