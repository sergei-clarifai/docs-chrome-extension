import React from "react";
import ReactDOM from "react-dom";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { useMyContextState } from '../context';

const RehypeComponentsList = (staticFiles) => ({
  table: (props) => {
    return <table
        style={{ border: '#aaa 0px solid', borderRadius: 5 }}
      >
        {props.children}
      </table>;
  },
  tip: (props) => {
    return <div
      style={{
        backgroundColor: '#777',
        padding: 10,
        borderRadius: '5px',
        color: '#fff',
      }}
    >
      {props.children}
    </div>;
  },
  danger: (props) => {
    return <div
      style={{
        backgroundColor: '#f00',
        padding: 10,
        borderRadius: '5px',
        color: '#fff',
      }}
    >
      {props.children}
    </div>;
  },
  pre: (props) => {
    return <pre style={{
      border: '#f00 0px solid',
      padding: 5, //'5px !important',
      overflow: 'hidden',
      backgroundColor: '#555555',
      borderRadius: '5px',
      color: 'white',
      marginTop: '10px',
      marginBottom: '10px',
      marginLeft: '-5px',
      marginRight: '-5px',
    }}>{props.children}</pre>;
  },
  hr: (props) => {
    return <hr style={{
      marginTop: 5,
      marginBottom: 10,
    }}>{props.children}</hr>;
  },
  img: (props) => {
    // console.log('XXX MARKDOWN props.src:', props.src);
    // console.log('XXX MARKDOWN staticFiles:', staticFiles);
    return <img 
      src={staticFiles[`docs/static${props.src}`].download_url}
      style={{
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        marginLeft: '-5px',
        maxWidth: 'calc(100% + 10px)',
      }}
    />;
  }, 
  h1: (props) => {
    return <h1 style={{
      marginTop: 20,
      fontSize: '3em',
      fontWeight: 800,
      color: '#333',
    }}>{props.children}</h1>;
  },
  p: (props) => {
    return <p style={{
      marginBottom: 10,
    }}>{props.children}</p>;
  },
  h2: (props) => {
    return <h2 style={{
      marginTop: 10,
      fontSize: '2em',
      fontWeight: 800,
      color: '#555',
    }}>{props.children}</h2>;
  },
  a: (props) => {
    return <a href={props.href}>
      {props.children}
    </a>;
  }
});

function compile(val, staticFiles) {
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
      components: RehypeComponentsList(staticFiles)
    });

  const ast = processor.runSync(processor.parse(val));

  return {
    ast,
    contents: processor.stringify(ast)
  };
}

export default function MarkDown({ markdown, staticFiles }) {
  // const state = useMyContextState();
  const { contents, ast } = compile(markdown, staticFiles);
  return (
    <div
      style={{
        border: "#f00 0px solid",
        overflow: 'auto',
        height: '100%',
        padding: 10
      }}
    >
      {contents}
    </div>
  );
}

