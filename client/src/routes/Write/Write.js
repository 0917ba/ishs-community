import React, { useState } from "react";
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
  return (
    <div className="editor">
        <input
          type='text'
          name='제목'
          placeholder='제목 입력해주세요'
          className="Titleeditor"
        />
      <Editor data={data} onChange={setData} editorblock="editorjs-container" />
      <button
        className="savebtn"
        onClick={() => {
          alert(JSON.stringify(data));
        }}
      >
        Save
      </button>
    </div>
  );
}

export default Write;