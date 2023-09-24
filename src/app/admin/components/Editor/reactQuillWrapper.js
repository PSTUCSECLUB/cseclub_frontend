import ReactQuill from "react-quill";

export default function WrappedEditor({ editorRef, ...props }) {
  return <ReactQuill {...props} ref={editorRef} />;
}
