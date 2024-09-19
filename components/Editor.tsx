"use client";
import EditorJS from "@editorjs/editorjs";
import React, { useEffect, useRef } from "react";

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
};
function Editor() {
  const ejInstance = useRef<EditorJS>();

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }
  }, []);

  const initEditor = () => {
    if (!ejInstance.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          ejInstance.current = editor;
        },
        autofocus: true,
        data: DEFAULT_INITIAL_DATA,
        onChange: async () => {
          const content = await editor.saver.save();

          console.log(content);
        },
      });
    }
  };

  return (
    <div className="bg-slate-200" id="editorjs">
      Editor{" "}
    </div>
  );
}

export default Editor;
