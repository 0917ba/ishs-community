import React from 'react';
import Route, { useNavigate } from "react-router-dom";
import './HeaderPost.css';
import logIshsLogo from '../component/img/log_ishs_image.png';

const HeaderPost = () => {
    const navigate = useNavigate();
    const navigatetoMain = () => {
        navigate("/");
    }
    // FIXME: 링크 연결 필요함.
    return (
    <header>
        <div className="header">
            <img src={logIshsLogo} alt="log_ishs" onClick={navigatetoMain} className="header_img"/>
                <a href="/" className="header_txt">학교 소개</a>
                <a href="/" className="header_txt">지식 in곽</a>
                <a href="/" className="header_txt">학교 일정</a>
                <a href="/" className="header_txt">학습 자료</a>
                <a href="/" className="header_txt">면불 신청</a>
                <a href="/" className="header_txt">동아리 리그전</a>
                <a href="/BigBang" className="header_txt">빅뱅</a>
                <a href="/" className="header_txt">광고신청</a>
        </div>
    </header>
    );
}
export default HeaderPost;