import React from "react";
import ReactDOM from "react-dom";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { useMyContextState } from '../context';

const RehypeComponentsList = {
  table: (props) => {
    return <table
        style={{ border: '#aaa 0px solid', borderRadius: 5 }}
      >
        {props.children}
      </table>;
  },
  a: (props) => {
    return <a href={props.href}>
      {props.children}
    </a>;
  }
};

function compile(val) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, null, {
      handlers: Object.assign({}),
      allowDangerousHTML: true
    })
    .use(rehypeRaw)
    .use(rehypeReact, {
      createElement: React.createElement,
      components: RehypeComponentsList
    });

  const ast = processor.runSync(processor.parse(val));

  return {
    ast,
    contents: processor.stringify(ast)
  };
}

export default function MarkDown({markdown}) {
  // const state = useMyContextState();
  const { contents, ast } = compile(markdown);
  return (
    <div
      style={{
        border: "#f00 0px solid",
        overflow: 'auto',
        padding: 10
      }}
    >
      {contents}
    </div>
  );
}

