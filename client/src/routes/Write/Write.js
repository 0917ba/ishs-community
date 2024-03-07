import React, { useEffect, useState } from "react";
import "./Write.css";
import Editor from "./Editor";

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
  const [data, setData] = useState(INITIAL_DATA);
  const [title, setTitle] = useState("제목");
  const [author, setAuthor] = useState();

  const getAuthor = async () => {
    const response = await fetch("/check_session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include"
    });
    const json = await response.json();
    setAuthor(json.content);
  }

  const saveData = async () => {
    const data2 = {
      authorId: author.uid,
      author: author.nickname,
      title: title,
      content: JSON.stringify(data),
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
    } else {
      alert("글 저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <div className="editor">
        <input
          type='text'
          name='제목'
          placeholder='제목 입력해주세요'
          className="Titleeditor"
          onChange={(e) => setTitle(e.target.value)}
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
  );
}

export default Write;