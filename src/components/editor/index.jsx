import dynamic from "next/dynamic";
import { useState } from "react";

export default function Editor() {
  const ReactQuill = dynamic(() => import("./reactQuill"), { ssr: false });
  const [content, setContent] = useState("");

  return (
    <div>
      <ReactQuill content={content} setContent={setContent} />
    </div>
  );
}
