import React, { useState, useEffect, useCallback } from 'react';

import { listFiles } from '../utils/drive';

const API_KEY = 'AIzaSyAZkK2rXKZ-BbfJ3MyE3eM_mB-cORFwqHU';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
];

export const useGoogle = () => {
  const [driveReady, setDriveReady] = useState(false);
  useEffect(() => {
      const SCOPE = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
      const handleClientLoad = () => window.gapi.load('client:auth2', initClient);
      // const handleClientLoad = () => {
      //   console.log('XXX onGAPILoad !!!!');
      //   window.gapi.client
      //     .init({
      //       // Don't pass client nor scope as these will init auth2, which we don't want
      //       apiKey: API_KEY,
      //       discoveryDocs: DISCOVERY_DOCS,
      //     })
      //     .then(
      //       function () {
      //         console.log('gapi initialized');
      //         chrome.identity.getAuthToken({ interactive: true }, function (token) {
      //           console.log('access_token', token);

      //           window.gapi.auth.setToken({
      //             access_token: token,
      //           });
      //           listFiles();
      //         });
      //       },
      //       function (error) {
      //         console.log('error', error);
      //       }
      //     );
      // }
  
      const initClient = () => {
          window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
          })
          .then(
            function () {
              console.log('gapi initialized:', chrome.identity);
              chrome.identity.getAuthToken({ interactive: true }, function (token) {
                console.log('access_token', token);

                window.gapi.auth.setToken({
                  access_token: token,
                });
                
                setDriveReady(true);
              });
            },
            function (error) {
              console.log('error', error);
            }
          );
          console.log("Google loaded");
      };

      const script = document.createElement('script');

      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.defer = true;
      script.onload = handleClientLoad;

      document.body.appendChild(script);

      return () => {
          document.body.removeChild(script);
      };

  }, []);
  return driveReady;
};

export const GoogleDriveFiles = ({
  folderIds,
}) => {
  const [driveFiles, setDriveFiles] = useState((folderIds || []).reduce((acc, folderId) => {
    acc[folderId] = [];
    return acc;
  }, {}));
  const driveReady = useGoogle();

  useEffect(() => {
    if(driveReady) {
      (folderIds || []).forEach((folderId) => listFiles(folderId).then((files) => {
        console.log('DRIVE FILES:', files);
        setDriveFiles((oldDriveFiles) => ({
          ...oldDriveFiles,
          [folderId]: files,
        }));
      }).catch((e) => console.log('DRIVE ERROR:', e)))
    }
  }, [driveReady, folderIds]);

  return (
    <>
      {(folderIds || []).map((folderId) => (driveFiles[folderId].map((file) => (
      <a
        style={{
          display: 'flex',          
          flexDirection: 'column',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          fontWeight: 600,
          color: '#333',
          textDecoration: 'none',
          width: 300,
          minWidth: 300,
          marginRight: 10,
        }}
        href={file.webViewLink}
      >
        <h3 className='title'>{file.name}</h3>
        <img
          src={file.thumbnailLink}
          alt={file.name}
          className='rounded-lg'
        />
      </a>)))).flat()}
    </>
  );
};