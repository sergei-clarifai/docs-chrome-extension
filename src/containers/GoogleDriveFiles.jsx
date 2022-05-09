import React, { useState, useEffect } from 'react';
import { CarouselList } from '../components/CarouselList/CarouselList';
import { listFiles } from '../utils/drive';
import '../assets/styles/tailwind.css';

const API_KEY = 'AIzaSyAZkK2rXKZ-BbfJ3MyE3eM_mB-cORFwqHU';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
];

const useGoogle = () => {
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
  category,
  heading,
  description,
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
      }).catch((e) => {
        console.log('DRIVE ERROR:', e);
      })
      )      
    }
  }, [driveReady]);

  console.log('XXX driveReady:', driveReady);

  return (
    <div className='gdrive-carousel-wrapper padding'>
      <div className="flex-auto max-w-4xl">
        <p className="text-sm leading-6 font-semibold text-sky-500">{category}</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{heading}</h1>
        <p className="mt-1 text-lg text-slate-700 dark:text-slate-400">{description}</p>
      </div>
      {(folderIds || []).map((folderId) => (
        <CarouselList>
          {driveFiles[folderId].map((file) => (
            <a
              className='block'
              href={file.webViewLink}
              style={{
                background: `url(${file.thumbnailLink}) 100% no-repeat`,
                minHeight: '100%',
                minWidth: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
              }}
              >
              <div className='content p-4'>
                <h1 className='mt-1 text-lg text-white'>{file.name}</h1>
                <br />
                {/* <img src={file.thumbnailLink} alt="thumbnail-elm" /> */}
              </div>
            </a>
          ))}
        </CarouselList>
      ))}
    </div>
  );
};