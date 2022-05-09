import React, { useState, useEffect } from 'react';
import './Newtab.css';
import './Newtab.scss';
import { GithubFiles } from '../../containers/GithubFiles';
import { GoogleDriveFiles } from '../../containers/GoogleDriveFiles';
import { listFiles } from '../../utils/drive';
// import { markdown } from './constants';



const Newtab = () => {
  return (
    <div style={{
        boxSizing: 'border-box',
        padding: 10,
      }}
    >
      <GoogleDriveFiles  folderIds={['1bviyV6Gh3cFppFNu4hC5MQoCi2pas502', '1ugZjUFj2JM2Y4rOBHH9byVaOceaH3CyJ']} />
      <GithubFiles />
    </div>
  );
};

export default Newtab;
