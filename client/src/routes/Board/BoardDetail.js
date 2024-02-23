import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Post from '../../component/Post/Post';

function BoardDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState();
  const [inputComment, setInputComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [delCommentId, setDelCommentId] = useState('');
  useEffect(() => {
    (async () => {
      console.log(location.state);

      const resp = await fetch(`http://app.ishs.co.kr/post?${location.state}`);
      const data = await resp.json();
      setPost(data);
    })();
  }, []);

  const onChangeCm = (e) => {
    setInputComment(e.target.value);
  };

  const InputComment = async () => {
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorId: post.uid,
        author: post.author,
        postId: location.state,
        target: null, //대댓글일 경우에는 target에 대댓글의 id를 넣어주면 됨
        content: inputComment,
      }),
    };
    const serverUrl = 'http://app.ishs.co.kr';
    const resic = await fetch(serverUrl + '/comment', formData);
  };

  const EditCommet = async () => {
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

  return (
    <div>
      <div>{JSON.stringify(post)}</div>
      <div>
        <label htmlFor='input_comment'>댓글을 작성해주세요.</label>
        <input
          type='text'
          name='input_comment'
          value={inputComment}
          onChange={onChangeCm}
        />
        <button onClick={InputComment}>댓글 작성</button>
      </div>
    </div>
  );
}

export default BoardDetail;
