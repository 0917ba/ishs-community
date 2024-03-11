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
import ReadOnlyEditor from '../Write/ReadOnlyEditor';

function BoardDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  //post_report
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [postReportMean, setPostReportMean] = useState('');

  //post_comment_report
  const [commentReportMean, setCommentReportMean] = useState('');

  //check_session
  const [usernickname, setUsernickname] = useState('');
  const [useruid, setUseruid] = useState('');
  const [admin, setAdmin] = useState(false);

  //board_detail
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('Title');
  const [content, setContent] = useState('Content');
  const [createdAt, setCreatedAt] = useState('2000-01-01 00:00:00');
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [view, setView] = useState(0);
  const [author, setAuthor] = useState('');
  const [authorNickname, setAuthorNickname] = useState('ㅇㅇ');

  //comment
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState('');

  const uid = location.state;

  const fetchPost = async (uid) => {
    if (!loaded) {
      const response = await fetch(`/post?uid=${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      });
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
        setAuthorNickname(data.author);
        console.log(authorNickname);

        // for (let i = 0; i < comments.length; i++) {
        //   const temp = (
        //     <div className='comment_box' key={'comment' + i}>
        //       {/* <p className='comment_author' key={"author" + i}>{comments[i].author}</p>
        //       <p className='comment_content' key={"content" + i}>{comments[i].content}</p>
        //       <img src={report} alt='report' className='report' key={"image" + i}/>
        //       <p className='comment_time' key={"createdAt" + i}>{comments[i].createdAt}</p> */}
        //       <Comment comments={comments} />
        //     </div>
        //   );
        //   setCommentRender(comment_render.push(temp));
        // }
        // console.log(comment_render);
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
        userId: useruid,
        targetId: uid,
        status: 'LIKE',
      }),
    };

    await fetch(`/reaction`, formData);

    const getresLIKE = await (
      await fetch(`/reaction?userId=${useruid}&type={POST}&targetId=${uid}`, {
        mode: 'cors',
        credentials: 'include',
      })
    ).json();

    renderReaction();
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
        userId: useruid,
        targetId: uid,
        status: 'DISLIKE',
      }),
    };
    await fetch(`/reaction`, formData);

    renderReaction();
  };

  const renderReaction = async () => {
    const resReaction = await (
      await fetch(`/post?uid=${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
    ).json();

    //console.log(resReaction);
    setLike(resReaction.content.like);
    setDislike(resReaction.content.dislike);
  };

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
        authorId: useruid,
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

  const onChangeinputComment = (e) => {
    setInputComment(e.target.value);
  };

  const onClickinputComment = async () => {
    console.log(inputComment);
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        authorId: useruid,
        author: usernickname,
        postId: uid,
        target: null,
        content: inputComment,
      }),
    };
    console.log(inputComment);
    await fetch(`/comment`, formData);
    console.log(inputComment);
    setInputComment('');
    renderComment();
  };

  const renderComment = async () => {
    const resComments = await (
      await fetch(`/post?uid=${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
    ).json();

    console.log(resComments);
    setComments(resComments.content.comments);
  };
  const onRemove = () => {
    if (window.confirm('정말 삭제합니까?')) {
      onClickDelete();
      alert('삭제되었습니다.');
      navigate('/BigBang');
    } else {
      alert('취소합니다.');
    }
  };

  const onClickDelete = async () => {
    const response = await fetch(`/post`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        uid: uid,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const onKeyDownInputComment = (e) => {
    if (e.key === 'Enter') {
      console.log('enter');
      onClickinputComment();
    }
  };

  useEffect(() => {
    if (!uid) {
      alert('잘못된 접근입니다.');
      window.location.href = '/';
    }
    (async () => {
      const res = await fetch(`/check_session`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      });
      if (res.status === 404) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      } else if (res.status === 200) {
        const data = await res.json();
        console.log('check_session: ' + data);

        setUseruid(data.content.uid);
        setUsernickname(data.content.nickname);

        if (res.content.role === 'ADMIN') {
          setAdmin(true);
        }

        fetchPost(uid);
      }
    })();
  }, []);

  return (
    <div className='scroll'>
      <HeaderPost />

      <div className='body'>
        <div className='post_information'>
          <p className='title'>{title}</p>
          <div className='post_info'>
            {usernickname === authorNickname && (
              <button
                className='edit'
                onClick={() =>
                  navigate('/Write', {
                    state: {
                      type: 'e',
                      title: title,
                      data: JSON.parse(content),
                      uid: uid,
                    },
                  })
                }
              >
                수정
              </button>
            )}
            {usernickname === authorNickname && admin && (
              <button className='delete' onClick={onRemove}>
                삭제
              </button>
            )}

            <p className='post_time'>
              {authorNickname}/{createdAt}
            </p>
          </div>
        </div>
        <div className='post_content'>
          <div>
            {loaded ? <ReadOnlyEditor data={JSON.parse(content)} /> : <></>}
          </div>
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
            onKeyDown={onKeyDownInputComment}
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
    </div>
  );
}

export default BoardDetail;
