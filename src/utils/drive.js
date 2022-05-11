// chrome.identity.getAuthToken({ interactive: true }, function (token) {
//   console.log('got the token', token);
// });

import { data } from "autoprefixer";
import { loadFromLocal } from './localStorage';

const DISABLE_CACHE = true;

// const API_KEY = 'AIzaSyAZkK2rXKZ-BbfJ3MyE3eM_mB-cORFwqHU';
// const DISCOVERY_DOCS = [
//   'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
// ];

// function onGAPILoad() {
//   console.log('XXX onGAPILoad !!!!');
//   gapi.client
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

//           gapi.auth.setToken({
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

export function getFileById(fileId) {
  const localKey = `googleDriveCache_files_get_${fileId}`;
  const localData = loadFromLocal(localKey);

  if (!DISABLE_CACHE && localData) {
    const { saveTime, response } = localData;
    if (response && response.result) {
      // return Promise.resolve(response);

    }    
  }

  return gapi.client.drive.files
    .get({
      fileId,
      fields: 'id, name, thumbnailLink, hasThumbnail, iconLink, owners, videoMediaMetadata, webContentLink, webViewLink',
    }).then((response) => {
      const saveData = JSON.stringify({ saveTime: new Date(), response });
      localStorage.setItem(localKey, saveData);
      return response;
    });
}

export function listFiles(folderId) {
  const localKey = `googleDriveCache_files_list_${folderId}`;

  const localData = loadFromLocal(localKey);

  if (!DISABLE_CACHE && localData) {
    const { saveTime, response } = localData;
    if (response && response.result) {
      // return Promise.resolve(response.result.files);
    }    
  }

  return gapi.client.drive.files
    .list({
      fields:
        'nextPageToken, files(id, name, thumbnailLink, hasThumbnail, iconLink, owners, videoMediaMetadata, webContentLink, webViewLink)',
      includeItemsFromAllDrives: true,
      maxResults: 10000,
      q: `'${folderId}' in parents`,
      supportsAllDrives: true,
      supportsTeamDrives: true,
    })
    .then(function (response) {
        // const saveData = JSON.stringify({ saveTime: new Date(), response });
        // localStorage.setItem(localKey, saveData);
        return response.result.files;
    })
}

