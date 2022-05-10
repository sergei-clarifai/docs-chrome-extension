import React, { useEffect, useState } from 'react';
import MarkDown from '../components/MarkDown';
import { getDocsFromGithub } from '../utils/gitHub';

export const GithubFiles = () => {
  const [markdownFiles, setMarkdownFiles] = useState([]);
  useEffect(() => {
    getDocsFromGithub()
      .then((r) => {
        setMarkdownFiles(r);
      })
      .catch((e) => {
        console.log('XXX getDocsFromGithub ERROR:', e);
      });
    }, []);

  return (
    <>    
    { markdownFiles.map(({ name, content, html_url }) => {
      return <div key={name} style={{
        border: '#f00 0px solid',
        borderRadius: 5,
        boxSizing: 'border-box',
        padding: 10, 
        fontSize: '0.6em',
        flex: 1,
        minWidth: 300,
        maxHeight: 400,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <MarkDown markdown={content} />
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#777',
            opacity: 0.03,
            cursor: 'pointer',
            display: 'block',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
          }}
          onClick={() => document.location.href = html_url}
        />
      </div>;
    })
    }
    </>
  );
};
