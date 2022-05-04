import React, { useState, useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import MarkDown from '../../components/MarkDown';
import './Newtab.css';
import './Newtab.scss';
import { getDocsFromGithub } from '../../utils/gitHub';
import { markdown } from './constants';

const Newtab = () => {

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
    <div style={{
        boxSizing: 'border-box',
        padding: 10,
      }}
    >
      <div style={{
        display: 'flex',
        height: 300,
        gap: 10,
        width: '100%',
        boxSizing: 'border-box',
        padding: 10,
        overflow: 'auto',
        fontSize: '0.5em',
      }}>
      
      {markdownFiles.map(({ name, content, html_url }) => {
        return <div key={name} style={{
          border: '#f00 0px solid',
          borderRadius: 5,
          boxSizing: 'border-box',
          padding: 10, 
          flex: 1,
          minWidth: '20%',
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
      })}
      </div>
    </div>
  );
};

export default Newtab;
