"use client";
import { postImage, deleteImage } from "@/app/admin/actions/uploadActions";
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import dynamic from "next/dynamic";

const WrappedEditorr = dynamic(() => import("./reactQuillWrapper"), {
  ssr: false,
});

const ForwardRefEditor = forwardRef((props, ref) => (
  <WrappedEditorr {...props} editorRef={ref} />
));
const MyEditor = ({ setValue, setImageFiles, imageFiles, value }) => {
  const quillRef = useRef();

  const imageHandler = () => {
    if (typeof document === "undefined") return;
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "");
    input.click();

    input.addEventListener("change", async (e) => {
      const files = [...input.files];
      const formData = new FormData();

      if (files.length > 0) {
        files.forEach((file) => formData.append("image", file));
      }

      try {
        const { image } = await postImage(formData);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", image);
        setImageFiles((prev) => [...prev, image]);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const removeImage = async (fileId) => {
    try {
      await deleteImage({ url: fileId });
    } catch (error) {
      console.log(error);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, false] }],

          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ align: [] }, { color: [] }, { background: [] }],

          ["image", "link", "video"],
          ["code-block"],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "code-block",
  ];

  useEffect(() => {
    if (
      quillRef.current?.lastDeltaChangeSet?.ops[1]?.delete === 1 &&
      imageFiles.length > 0
    ) {
      for (let index = 0; index < imageFiles.length; index++) {
        if (!quillRef.current?.value.includes(imageFiles[index])) {
          const tempImageFiles = structuredClone(imageFiles);
          const filteredIamgeFiles = tempImageFiles.filter(
            (image) => image !== imageFiles[index]
          );
          removeImage(imageFiles[index]);

          setImageFiles(filteredIamgeFiles);
        }
      }
    }
  }, [quillRef.current?.lastDeltaChangeSet?.ops[1]?.delete]);

  return (
    <>
      <ForwardRefEditor
        ref={quillRef}
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </>
  );
};

export default MyEditor;
