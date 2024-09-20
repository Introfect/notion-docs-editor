"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import CustomTextTool from "./CustomTextTool";
import CustomImageTool from "./CustomImageTool";
import CustomCodeBlockTool from "./CustomCodeBlockTool";
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
          text: CustomTextTool,
          image: CustomImageTool,
          code: CustomCodeBlockTool,
        },
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

  const handleSave = async () => {
    const savedData = await editorInstance.current?.save();
    console.log(savedData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-screen p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form id="subreddit-post-form" className="w-fit">
        <div className="prose prose-stone">
          <div id="editorjs" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CustomEditor;
