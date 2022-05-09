// chrome.identity.getAuthToken({ interactive: true }, function (token) {
//   console.log('got the token', token);
// });

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

export function listFiles(folderId) {
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
        //   response.result.files.map((file) => {
        //     console.log(file);
        //   });
        return response.result.files;
    })
}

