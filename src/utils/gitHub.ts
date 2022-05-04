import { loadFromLocal } from './localStorage';

const { username: githubUsername, token: githubToken } =
  loadFromLocal('github');

function authenticateUser(user: string, password: string) {
  const token = user + ':' + password;
  const hash = btoa(token);

  return 'Basic ' + hash;
}

export function fetchGitHub(giturl: string) {
  return fetch(giturl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authenticateUser(githubUsername, githubToken),
    },
  }).then((response) => response.json());
}

export function postGitHub(giturl: string, body: any) {
  return fetch(giturl, {
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `token ${githubToken}`,
    },
  }).then((response) => response.json());
}

function b64EncodeUnicode(str: string) {
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

function b64DecodeUnicode(str: string) {
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
): any {
  if (githubUsername && githubToken) {
    return [];
  }

  const giturl = `https://api.github.com/repos/${userName}/${repoName}/contents/${path}${
    ref ? `?ref=${ref}` : ''
  }`;

  console.log('XXX fetchFolderFiles giturl:', giturl);

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

  console.log('XXX fetchFolderFiles result:', result);

  return result;
}

export async function getDocsFromGithub() {
  const userName = 'Clarifai';
  const repoName = 'clarifai-web';
  const branchName = 'master';
  const path = 'docs/docs';

  const localStorageKey = 'listOfDocFilesFromGithub';

  let cachedFileList = localStorage[localStorageKey];

  if (false || !cachedFileList || !cachedFileList.length) {
    const filenames = await fetchFolderFiles(
      userName,
      repoName,
      path,
      branchName,
      false
    );

    localStorage.setItem(localStorageKey, JSON.stringify(filenames));

    cachedFileList = JSON.stringify(filenames);
    console.log('XXX TRUE');
  } else {
    console.log('XXX FALSE');
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
