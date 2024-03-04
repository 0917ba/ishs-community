import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Post from '../../component/Post/Post';

function BoardDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState();
  const [commentList, setCommentList] = useState([]);
  const [inputComment, setInputComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [delCommentId, setDelCommentId] = useState('');
  useEffect(() => {
    (async () => {
      console.log(location.state);

      const resp = await fetch(
        `http://app.ishs.co.kr/post?uid=${location.state}`
      );
      const data = await resp.json();
      console.log(data);
      setPost(data.content);
      setCommentList(data.content.comments.map((comment) => comment));
    })();
  }, []);

  const onChangeCm = (e) => {
    console.log(e.target.value);
    setInputComment(e.target.value);
  };

  const InputComment = async () => {
    console.log(inputComment);
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorId: post.authorId,
        author: post.author,
        postId: post.uid,
        target: '', //대댓글일 경우에는 target에 대댓글의 id를 넣어주면 됨
        content: inputComment,
      }),
    };
    const serverUrl = 'http://app.ishs.co.kr';
    const resic = await fetch(serverUrl + '/comment', formData);
    console.log(resic);
  };

  const EditComment = async () => {
    const formData = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: editComment,
        uid: commentId,
      }),
    };

    const serverUrl = 'http://app.ishs.co.kr';
    const resec = await fetch(serverUrl + '/comment', formData);
  };

  const DeleteComment = async () => {
    const serverUrl = 'http://app.ishs.co.kr';
    const resdc = await fetch(serverUrl + '/comment', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: delCommentId,
      }),
    });
  };

  const dataCheck = () => {
    if (inputComment === '') {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
        <p>{post.author}</p>
        <p>{post.authorId}</p>
        <p>{post.content}</p>
        <p>{post.createdAt}</p>
        <p>{post.like}</p>
        <p>{post.dislike}</p>
        <p>{post.view}</p>
        <p>{post.uid}</p>
        <hr />
      </div>
      <div>
        {commentList.map((comment) => (
          <div>
            <p>{comment.author}</p>
            <p>{comment.like}</p>
            <p>{comment.dislike}</p>
            <p>{comment.createdAt}</p>
            <p>{comment.content}</p>
            <p>{comment.target}</p>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor='input_comment'>댓글을 작성해주세요.</label>
        <input
          type='text'
          name='input_comment'
          value={inputComment}
          onChange={onChangeCm}
        />
        <button onClick={InputComment} disabled={dataCheck()}>
          댓글 작성
        </button>
      </div>
    </div>
  );
}

export default BoardDetail;
