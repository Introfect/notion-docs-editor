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
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        onReady() {
          editorInstance.current = editor;
        },
        placeholder: "Type here to write your post...",
        tools: {
          header: CustomHeaderTool,
          text: CustomTextTool,
          image: CustomImageTool,
          code: CustomCodeBlockTool,
        },
        defaultBlock: "text",
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();

      return () => {
        editorInstance.current?.destroy();
        editorInstance.current = null;
      };
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-screen p-4 bg-zinc-50 rounded-lg border border-zinc-200">
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
            focus:outline-none
            text-black
            autoFocus "
          />
          <div id="editorjs" />
        </div>
      </form>
    </div>
  );
};

export default CustomEditor;
