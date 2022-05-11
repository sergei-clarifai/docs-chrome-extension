import React, { useEffect, useState } from 'react';
import MarkDown from '../components/MarkDown';
import { getDocsFromGithub } from '../utils/gitHub';

export const GithubFiles = () => {
  const [markdownFiles, setMarkdownFiles] = useState([]);
  useEffect(() => {
    getDocsFromGithub()
      .then((r) => {
        console.log('GITHUB files:', r);
        setMarkdownFiles(r.filter((file) => file && file.content).map((file) => ({
          ...file,
          content: file.content.replace(/---\nsidebar_position: \d+\n---\n/, ''), 
        })));
      })
      .catch((e) => {
        console.log('XXX getDocsFromGithub ERROR:', e);
      });
    }, []);

  return (
    <>    
    { markdownFiles.map((file) => {
      console.log('XXX GITHUB file:', file);
      
      const { name, content, html_url, download_url, staticFiles } = file;
      const token = download_url.split('?token=')[1];
      return <div
        className={'markdownParent'}
        key={name}
        style={{
          border: '#f00 0px solid',
          borderRadius: 5,
          boxSizing: 'border-box',
          padding: 10, 
          fontSize: '0.6em',
          flex: 1,
          minWidth: 550,
          maxHeight: 700,
          position: 'relative',
          backgroundColor: '#fff5f2',
          cursor: 'pointer',
        }}
        onClick={(e) => {

          // const findParent = (el, className) => {
          //   if (el.className === className) {
          //     return el;
          //   } 
          //   if(el.parentElement) {
          //     return findParent(el.parentElement, className);
          //   }
          //   return null;
          // };

          // console.log('XXX EVENT:', findParent(e.target, 'markdownParent'));
          // const parent = findParent(e.target, 'markdownParent');
          // parent.style.position = 'absolute';
          // parent.style.top = '0px';
          // parent.style.left = '0px';
          // parent.style.width = '100%';
          // parent.style.height = 'auto';
          // parent.style.fontSize = '1em';
          // parent.style.maxHeight = 'auto';
          // parent.style.zIndex = 100000;

          document.location.href = html_url;
        }}
      >
        <MarkDown markdown={content} staticFiles={staticFiles} />
        {/* <div
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
        /> */}
      </div>;
    })
    }
    </>
  );
};
