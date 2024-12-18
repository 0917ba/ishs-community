import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Bigbang2.css";
import TestBoardList from "./BigbangTest";

function BigbangPage2() {

    const [boardList, setBoardList] = useState([]);

    const getBoardList = async (start, end) => {
        const resp = await fetch(`/post/list?board=GRADE`);
        let json = await resp.json();
        console.log(json.content);
        setBoardList(json.content);
      };

    useEffect(() => {
        getBoardList();
    }, []);
    
    return(
        <>
        <div className="bigbang_nav">
            <p className="bigbang_title">Bigbang</p>
            <p className="bigbang_message">인곽인의 창의력을 펼치다</p>
            <p className="bigbang_menu1">글 작성하기</p>
            <p className="bigbang_menu2">내가 작성한 글</p>
            <p className="bigbang_menu3">내가 쓴 댓글</p>
            <p className="bigbang_menu4">내가 추천한 글</p>
        </div>
        <TestBoardList className="boardList" boardList={boardList}/>
        </>
    );
}

export default BigbangPage2