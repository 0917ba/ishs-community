import React, { useEffect, useState } from "react";
import Route, { useNavigate } from "react-router-dom";
import Session from "react-session-api";
import logIshsLogo from "./log_ishs_image.png";
import apoptosis from "./apoptosis.png";
import dopamine from "./dopamine.png";
import "./PostPage.css";
import BigBangBar from "../../component/BigBang/BingBang";
import MainMy from "../../component/MainMy/MainMy";

const PostPage = () => {
    const [uuid, setUuid] = useState('');
    const [author, setAuthor] = useState("ㅇㅇ");
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [view, setView] = useState(0);
    const [creatAt, setCreateAt] = useState("2000-01-01 00:00:00");
    const [comments, setComments] = useState([]);
    const [title, setTitle] = useState("Title");
    const [content, setContent] = useState("Content");
    const [admin, setAdmin] = useState(false);
    // const comment_

    const navigate = useNavigate();
    const navigatetoMain = () => {
        navigate("/main");
    }

    const params = new URLSearchParams(window.location.search);
    const uid = params.get("uid");

    const checkUser = async () => {
        let uuid = await Session.get("uid");
        setUuid(uuid);
        // if (uid === null) {
        //     navigate("/login");
        // }
        if(Session.get("role") === "ADMIN") {
            setAdmin(true);
        }
    };

    const fetchPost = async (uid) => {
        const response = await fetch(`http://app.ishs.co.kr/post?uid=${uid}`);
        // const response = await fetch(`http://app.ishs.co.kr/post/list?start=0&end=10`);
        let data = await response.json();
        // console.log(data);
        if(data.status === 200) {
            data = data.content;
            setAuthor(data.author);
            setLike(data.like);
            setDislike(data.dislike);
            setView(data.view);
            setCreateAt(data.createAt);
            setComments(data.comments);
            setTitle(data.title);
            setContent(data.content);
        }
        
    }

    const fetchReaction = async (type, userId, targetId, status) => {
        const response = await fetch(`http://app.ishs.co.kr/reaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: type,
                userId: userId,
                targetId: targetId,
                status: status
            })});
        let data = await response.json();
        setLike(data.like);
        setDislike(data.dislike);
    };

    const checkReaction = async (type, userId, targetId) => {
        const response = await fetch(`http://app.ishs.co.kr/reaction?type=${type}&userId=${userId}&targetId=${targetId}`);
        let data = await response.json();
        if(data.status === undefined) {
            return 'Error'
        }
        return data.status;
    };

    const clickReactionButton = async (type, userId, targetId, status) => {
        let status_already = await checkReaction(type, userId, targetId);
        if(status_already === 'NONE') {
            fetchReaction(type, userId, targetId, status);
        }
        else {
            fetchReaction(type, userId, targetId, 'NONE');
        }
    };

    useEffect(() => {
        fetchPost(uid);
    }, []);


    // FIXME: 유저 세션과 연동하여 접속자가 글쓴이일 경우 수정, 삭제 버튼을 보이도록 해야 함.
    return (
        <div>
            <header>
                <div className="header">
                    <img src={logIshsLogo} alt="log_ishs" onClick={navigatetoMain} className="header_txt"/>
                    <p className="header_txt">학교 소개</p>
                    <p className="header_txt">지식 in곽</p>
                    <p className="header_txt">학교 일정</p>
                    <p className="header_txt">학습 자료</p>
                    <p className="header_txt">면불 신청</p>
                    <p className="header_txt">동아리 리그전</p>
                    <p className="header_txt">빅뱅</p>
                    <p className="header_txt">광고신청</p>
                </div>
            </header>
            <div className="post_information">
                <p className="title">{title}</p>
                <div className="post_info">
                    { uuid === author && <p className="edit">수정</p> }
                    { uuid === author && admin && <p className="edit">삭제</p> }
                    <p className="post_time">{creatAt}</p>
                </div>
            </div>
            <hr className="line"></hr>
            <div className="post_content">
                <p className="content">{content}</p>
            </div>
            <div className="like_dislike">
                <div className="like">
                    <img src={dopamine} alt="dopamine" className="dopamine" onClick={fetchReaction()}/>
                    <p className="like_count" onClick={clickReactionButton('POST', uuid, uid, 'LIKE')}>{like}</p>
                </div>
                <div className="dislike">
                    <img src={apoptosis} alt="apoptosis" className="apoptosis"/>
                    <p className="dislike_count" onClick={clickReactionButton('POST', uuid, uid, 'DISLIKE')}>{dislike}</p>
                </div>
            </div>
            <hr className="line_comment"></hr>
            <div className="comment_write">
                <input type="text" className="comment_input" placeholder="댓글을 입력하세요."/>
                <button className="comment_button">등록</button>
            </div>
        </div>
    );
}

export default PostPage;