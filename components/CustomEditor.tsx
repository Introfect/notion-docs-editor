"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import CustomTextTool from "./CustomTextTool";
import CustomImageTool from "./CustomImageTool";
import CustomCodeBlockTool from "./CustomCodeBlockTool";
import CustomHeaderTool from "./CustomHeader";
import TextareaAutosize from "react-textarea-autosize";

const CustomEditor = () => {
  const editorInstance = useRef<EditorJS | null>(null);
  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    if (!editorInstance.current) {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        onReady() {
          editorInstance.current = editor;
        },
        placeholder: "Type here to write here and press / for commands",
        tools: {
          text: CustomTextTool,
          header: CustomHeaderTool,
          image: CustomImageTool,
          code: CustomCodeBlockTool,
        },
        defaultBlock: "text",
      });

      setIsEditorReady(true);
    }
  }, []);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!isEditorReady) {
        await initializeEditor();
      }
      document.getElementById("editorjs")?.focus();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-screen overscroll-y-auto p-4">
      <form className="w-fit">
        <div className="prose prose-stone">
          <TextareaAutosize
            placeholder="Untitled.."
            className="p-2
            rounded
            w-full
            resize-none
            appearance-none
            overflow-hidden
            bg-transparent
            text-5xl
            font-bold
            focus:outline-none
            text-slate-800
            autoFocus"
            onKeyDown={handleKeyDown}
          />

          <div id="editorjs" />
        </div>
      </form>
    </div>
  );
};

export default CustomEditor;
