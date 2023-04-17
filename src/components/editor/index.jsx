import dynamic from "next/dynamic";
import React, { forwardRef } from "react";

const Editor = forwardRef(function MyInput(props, ref) {
  const ReactQuill = dynamic(() => import("./reactQuill"), { ssr: false });
  return <ReactQuill quillRef={ref} />;
});

export default Editor;
