import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";

export const ReadOnlyEditor = ({ data }) => {
    const ref = useRef();
    //Initialize editorjs
    useEffect(() => {
      //Initialize editorjs if we don't have a reference
      if (!ref.current) {
        const editor = new EditorJS({
          holder: "editorjs-container",
          tools: EDITOR_JS_TOOLS,
          data: data,
          readOnly: true,
        });
        ref.current = editor;
      }
  
      //Add a return function to handle cleanup
      return () => {
        if (ref.current && ref.current.destroy) {
          ref.current.destroy();
        }
      };
    }, []);
    return <div id="editorjs-container" />;
  };

export default ReadOnlyEditor;