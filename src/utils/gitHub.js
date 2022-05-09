import { loadFromLocal } from './localStorage';

const { username: githubUsername, token: githubToken } =
  loadFromLocal('github');

console.log('githubUsername, githubToken:', githubUsername, githubToken);

function authenticateUser(user, password) {
  const token = user + ':' + password;
  const hash = btoa(token);

  return 'Basic ' + hash;
}

export function fetchGitHub(giturl) {
  return fetch(giturl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authenticateUser(githubUsername, githubToken),
    },
  }).then((response) => response.json());
}

export function postGitHub(giturl, body) {
  return fetch(giturl, {
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `token ${githubToken}`,
    },
  }).then((response) => response.json());
}

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }
    )
  );
}

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

export async function fetchFolderFiles(
  userName,
  repoName,
  path,
  ref,
  fetchContent = true
) {
  if (!githubUsername && !githubToken) {
    return [];
  }

  const giturl = `https://api.github.com/repos/${userName}/${repoName}/contents/${path}${
    ref ? `?ref=${ref}` : ''
  }`;

  const reponse = await fetchGitHub(giturl);
  let result = [];
  for (let i = 0; i < reponse.length; i++) {
    const item = reponse[i];

    if (item.type === 'dir') {
      const subResult = await fetchFolderFiles(
        userName,
        repoName,
        item.path,
        ref,
        fetchContent
      );
      result = result.concat(subResult);
    } else {
      result.push(item);
      if (fetchContent) {
        const contentReponse = await fetchGitHub(item.git_url);
        item.content = contentReponse.content;
      }
    }
  }

  return result;
}

export async function getDocsFromGithub() {
  const userName = 'Clarifai';
  const repoName = 'clarifai-web';
  const branchName = 'master';
  const path = 'docs/docs';

  const localStorageKey = 'listOfDocFilesFromGithub';

  let cachedFileList = localStorage[localStorageKey];

  console.log('BEFORE NO GITHUB CREDENTIALS');
  if (!githubUsername && !githubToken) {
    console.log('NO GITHUB CREDENTIALS');
    return [];
  }

  if (true || !cachedFileList || !cachedFileList.length) {
    const filenames = await fetchFolderFiles(
      userName,
      repoName,
      path,
      branchName,
      false
    );

    localStorage.setItem(localStorageKey, JSON.stringify(filenames));

    cachedFileList = JSON.stringify(filenames);
  }

  const docsFileNames = JSON.parse(cachedFileList).filter(({ name }) =>
    /\.md$/.test(name)
  );

  const selectedDocFiles = Array(4)
    .fill(0)
    .map(() => {
      const idx = Math.round(Math.random() * docsFileNames.length);
      const item = docsFileNames[idx];

      return item;
    });

  for (let i = 0; i < selectedDocFiles.length; i++) {
    const item = selectedDocFiles[i];
    const contentReponse = await fetchGitHub(item.git_url);

    item.content = b64DecodeUnicode(contentReponse.content);
  }

  return selectedDocFiles;
}
