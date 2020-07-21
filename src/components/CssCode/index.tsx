import React, { PropsWithChildren, useEffect, useRef } from "react";
import hljs from "highlight.js";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("css", css);

const CssCode = ({ children }: PropsWithChildren<any>) => {
  const preEl = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(preEl.current as unknown as HTMLElement)
  }, []);
  return (
    <pre ref={preEl}>
      <code className="css">{children}</code>
    </pre>
  );
};
export default CssCode;
