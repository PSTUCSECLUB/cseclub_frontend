import { jsx } from "@emotion/react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function QuillEditor({ quillRef }) {
  const [value, setValue] = useState(getValueFromStorage());
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      theme="snow"
      value={value}
      ref={quillRef}
      onChange={(val) => {
        setValue(val);
        if (val.length > 10) {
          saveValueInStorage(val);
        }
      }}
    />
  );
}

function saveValueInStorage(val) {
  sessionStorage.setItem("quillValue", JSON.stringify(val));
}
export function getValueFromStorage() {
  return JSON.parse(sessionStorage.getItem("quillValue"))
    ? JSON.parse(sessionStorage.getItem("quillValue"))
    : "";
}
