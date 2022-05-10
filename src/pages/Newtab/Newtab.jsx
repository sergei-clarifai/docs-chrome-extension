import React, { useState, useEffect } from 'react';
import './Newtab.css';
import './Newtab.scss';
import { GithubFiles } from '../../containers/GithubFiles';
import { GoogleDriveFiles } from '../../containers/GoogleDriveFiles';

const SliderContainer = ({children, title}) => {

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        gap: 10,
        flexDirection: 'column',
      }}
    >
    <h2>{title}</h2>
    <div
      style={{
        display: 'block',
        width: '100%',
        overflow: 'scroll',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 20,
        }}
      >
        {children}
      </div> 
    </div> 
    </div>
  );
}

const Newtab = () => {
  return (
    <div style={{
        boxSizing: 'border-box',
        padding: 10,
      }}
    >
      <SliderContainer title={'Engeneering Goodies Season #1'}>
        <GoogleDriveFiles folderIds={['1bviyV6Gh3cFppFNu4hC5MQoCi2pas502']} />
      </SliderContainer>
      <SliderContainer title={'Engeneering Goodies Season #2'}>
        <GoogleDriveFiles folderIds={['1ugZjUFj2JM2Y4rOBHH9byVaOceaH3CyJ']} />
      </SliderContainer>
      <SliderContainer title={'Engeneering Goodies Season #4'}>
        <GoogleDriveFiles folderIds={['1H1ZbBNa8uDkeHUbXNfHFa-i3SQkdOv4J']} />
      </SliderContainer>
      <GithubFiles />
    </div>
  );
};

export default Newtab;
