import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import Session from 'react-session-api';
import apoptosis from '../../component/img/apoptosis.png';
import dopamine from '../../component/img/dopamine.png';
import './PostPage.css';
import HeaderPost from '../../layout/HeaderPost';
import Footer from '../../layout/Footer';
import moment from 'moment';
import Comment from '../../component/Post/Comment';
import report from '../../component/img/report.svg';

const PostPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [postReportMean, setPostReportMean] = useState('');
  const [commentReportMean, setCommentReportMean] = useState('');
  const [authorUid, setAuthorUid] = useState('');
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [uuid, setUuid] = useState('');
  const [author, setAuthor] = useState('ㅇㅇ');
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [view, setView] = useState(0);
  const [createdAt, setCreatedAt] = useState('2000-01-01 00:00:00');
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState('Title');
  const [content, setContent] = useState('Content');
  const [admin, setAdmin] = useState(false);
  const [authorNickname, setAuthorNickname] = useState('ㅇㅇ');
  const [inputComment, setInputComment] = useState('');

  const onChangeCommentReportMean = (e) => {
    setCommentReportMean(e.target.value);
    console.log(commentReportMean);
  };

  const onClickCommentReport = async () => {
    console.log(commentReportMean);
    const resp = await fetch(`/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        type: 'COMMENT',
        targetId: uid,
        authorId: authorUid,
        content: commentReportMean,
      }),
    });
  };
  const CommentDataCheck = () => {
    if (commentReportMean === '') {
      return true;
    }
    return false;
  };

  const uid = location.state;

  const [comment_render, setCommentRender] = useState([
    <div>
      <div className='comment_box'>
        <div className='comment_container'>
          <p className='comment_author'>ㅇㅇ</p>
          <p className='comment_content'>댓글</p>
        </div>
        <div className='comment_info'>
          <img src={report} alt='report' className='report_button' />
          <div className={'btn-wrapper'}>
            <button onClick={() => setModalOpen(true)}>신고하기</button>
            {modalOpen && (
              <div
                className={'modal-container'}
                ref={modalBackground}
                onClick={(e) => {
                  if (e.target === modalBackground.current) {
                    setModalOpen(false);
                  }
                }}
              >
                <div className={'modal-content'}>
                  <label>신고사유 | </label>
                  <input
                    type='text'
                    name='신고사유'
                    placeholder='신고사유를 작성해주세요.'
                    value={commentReportMean}
                    onChange={onChangeCommentReportMean}
                  />
                  <button
                    type='button'
                    onClick={onClickCommentReport}
                    disabled={CommentDataCheck()}
                  >
                    신고하기
                  </button>
                  <button
                    className={'modal-close-btn'}
                    onClick={() => setModalOpen(false)}
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className='comment_time'>2000-01-01 00:00:00</p>
        </div>
      </div>
      <hr className='line_comment'></hr>
    </div>,
  ]);

  const onChangePostReportMean = (e) => {
    setPostReportMean(e.target.value);
    console.log(postReportMean);
  };

  const onClickPostReport = async () => {
    console.log(postReportMean);
    const resp = await fetch(`/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'POST',
        targetId: uid,
        authorId: authorUid,
        content: postReportMean,
      }),
    });

    setModalOpen(false);
    setCommentReportMean('');
  };

  const PostDataCheck = () => {
    if (postReportMean === '') {
      return true;
    }
    return false;
  };

  const checkUser = async () => {
    let uuid = await Session.get('uid');
    setUuid(uuid);
    // if (uid === null) {
    //     navigate("/login");
    // }
    if (Session.get('role') === 'ADMIN') {
      setAdmin(true);
    }
  };

  const fetchPost = async (uid) => {
    if (!loaded) {
      const response = await fetch(`/post?uid=${uid}`);
      // const response = await fetch(`http://app.ishs.co.kr/post/list?start=0&end=10`);
      let data = await response.json();
      // console.log(data);
      if (data.status === 200) {
        setLoaded(true);
        data = data.content;
        setAuthor(data.author);
        setLike(data.like);
        setDislike(data.dislike);
        setView(data.view);
        setCreatedAt(moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss'));
        setComments(data.comments);
        setTitle(data.title);
        console.log(data);
        setContent(data.content);
        console.log(comments);
        for (let i = 0; i < comments.length; i++) {
          const temp = (
            <div className='comment_box' key={'comment' + i}>
              {/* <p className='comment_author' key={"author" + i}>{comments[i].author}</p>
              <p className='comment_content' key={"content" + i}>{comments[i].content}</p>
              <img src={report} alt='report' className='report' key={"image" + i}/>
              <p className='comment_time' key={"createdAt" + i}>{comments[i].createdAt}</p> */}
              <Comment comments={comments} />
            </div>
          );
          setCommentRender(comment_render.push(temp));
        }
        console.log(comment_render);
      }
    }
  };

  const onClickLIKE = async () => {
    console.log('LIKE');
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        type: 'POST',
        userId: authorUid,
        targetId: uid,
        status: 'LIKE',
      }),
    };

    await fetch(`/reaction`, formData);

    const getresLIKE = await (
      await fetch(`/reaction?userId=${authorUid}&type={POST}&targetId=${uid}`, {
        mode: 'cors',
        credentials: 'include',
      })
    ).json();
    console.log(getresLIKE);
    setLike(getresLIKE.content.like);
  };

  const onClickDISLIKE = async () => {
    console.log('DISLIKE');
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        type: 'POST',
        userId: authorUid,
        targetId: uid,
        status: 'DISLIKE',
      }),
    };

    const res = await fetch(`/reaction`, formData);
  };

  const fetchReaction = async (type, userId, targetId, status) => {
    const response = await fetch(`/reaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        userId: userId,
        targetId: targetId,
        status: status,
      }),
    }).then(() => {
      fetchPost(uid);
    });
    let data = await response.json();
    setLike(data.like);
    setDislike(data.dislike);
  };

  const onChangeinputComment = (e) => {
    setInputComment(e.target.value);
  };

  const onClickinputComment = async () => {
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        authorId: authorUid,
        author: authorNickname,
        postId: uid,
        target: null,
        content: inputComment,
      }),
    };

    const resc = await fetch(`/comment`, formData);
    setInputComment('');
  };

  const renderComment = () => {
    return comment_render;
  };

  useEffect(() => {
    (async () => {
      const res = await (
        await fetch(`/check_session`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          credentials: 'include',
        })
      ).json();
      console.log(res);

      setAuthorUid(res.content.uid);
      setAuthorNickname(res.content.nickname);
      console.log(authorUid);
    })();

    fetchPost(uid);
  }, []);

  return (
    <>
      <HeaderPost />

      <div className='body'>
        <div className='post_information'>
          <p className='title'>{title}</p>
          <div className='post_info'>
            {uuid === author && (
              <a href='/' className='edit'>
                수정
              </a>
            )}
            {uuid === author && admin && (
              <a href='/' className='delete'>
                삭제
              </a>
            )}

            <p className='post_time'>
              {author}/{createdAt}
            </p>
          </div>
        </div>

        <div className='post_content'>
          <p className='content'>{content}</p>
        </div>
        <div className='like_dislike'>
          <div className='like'>
            <img
              src={dopamine}
              alt='dopamine'
              className='dopamine'
              onClick={onClickLIKE}
            />
            <p className='like_count'>{like} Dopamine</p>
          </div>
          <div className='dislike'>
            <img
              src={apoptosis}
              alt='apoptosis'
              className='apoptosis'
              onClick={onClickDISLIKE}
            />
            <p className='dislike_count'>{dislike} Apoptosis</p>
          </div>
        </div>
        <div className='report'>
          <div className={'btn-wrapper'}>
            <button onClick={() => setModalOpen(true)} className='singobtn'>
              신고하기
            </button>
            {modalOpen && (
              <div
                className={'modal-container'}
                ref={modalBackground}
                onClick={(e) => {
                  if (e.target === modalBackground.current) {
                    setModalOpen(false);
                  }
                }}
              >
                <div className={'modal-content'}>
                  <p className='singosingo'>신고 사유</p>
                  <input
                    type='text'
                    name='신고사유'
                    placeholder=' 신고사유를 작성해주세요.'
                    value={postReportMean}
                    onChange={onChangePostReportMean}
                    className='singoSaU'
                  />
                  <button
                    type='button'
                    onClick={onClickPostReport}
                    disabled={PostDataCheck()}
                    className='singobtn2'
                  >
                    신고하기
                  </button>
                  <button
                    className={'modal-close-btn'}
                    onClick={() => setModalOpen(false)}
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <hr></hr>

        <div className='comment_write'>
          <input
            type='text'
            className='comment_input'
            placeholder='댓글을 입력하세요.'
            value={inputComment}
            onChange={onChangeinputComment}
          />
          <button className='comment_button' onClick={onClickinputComment}>
            등록
          </button>
        </div>
        <div className='comment'>
          <Comment comments={comments} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PostPage;
