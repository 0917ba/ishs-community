import React, { useEffect, useState } from "react";
import "./Write.css";
import Editor from "./Editor";
import { useLocation, useNavigate } from "react-router-dom";

// Initial Data
const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "빅뱅 글쓰기!",
        level: 1,
      },
    },
  ],
};

function Write() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const state = location.state;

  const getAuthor = async () => {
    const response = await fetch("/check_session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include"
    });
    if (response.status === 404) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    } else if (response.status === 200) {
      const json = await response.json();
      setAuthor(json.content);
    }
  }

  const editData = async () => {
    const data2 = {
      uid: state.uid,
      title: title,
      content: JSON.stringify(data),
    };
    const response = await fetch("/post", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    });
    const status = response.status;
    if (status === 200) {
      alert("글이 성공적으로 수정되었습니다.");
      navigate("/BigBang");
    } else {
      alert("글 수정에 실패했습니다.");
    }
  };

  const writeData = async () => {
    const data2 = {
      authorId: author.uid,
      author: author.nickname,
      title: title,
      content: JSON.stringify(data),
      board: "GRADE"
    };
    const response = await fetch("/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    });
    const status = response.status;
    if (status === 200) {
      alert("글이 성공적으로 저장되었습니다.");
      navigate("/BigBang");
    } else {
      alert("글 저장에 실패했습니다.");
    }
  };

  const saveData = () => {
    if (state.type == "w") {
      writeData();
    } else if (state.type == "e") {
      editData();
    }
  };

  useEffect(() => {
    if (!state) {
      alert("잘못된 접근입니다.");
      window.location.href = "/";
    } else if (state.type == "w") {
      setData(INITIAL_DATA);
      setTitle("제목");
      setIsLoaded(true);
      console.log("글쓰기 페이지입니다.");
    } else if (state.type == "e") {
      setData(state.data);
      setTitle(state.title);
      setIsLoaded(true);
      console.log(state.data, state.title)
      console.log("글 수정 페이지입니다.");
    } else {
      alert("잘못된 접근입니다.");
      window.location.href = "/";
    }
    getAuthor();
  }, []);

  return (
    <div className="editor">
      {state.type == "w" ? <h1>글쓰기</h1> : <h1>글수정</h1>}
      {(isLoaded) ? (
        <div className="container">
        <input
          type='text'
          name='제목'
          placeholder='제목 입력해주세요'
          className="Titleeditor"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
        />
      <Editor data={data} onChange={setData} editorblock="editorjs-container" />
      <button
        className="savebtn"
        onClick={() => {
          saveData();
        }}
      >
        Save
      </button>
      </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Write;