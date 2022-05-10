import { loadFromLocal } from './localStorage';

const { spaceName } = loadFromLocal('config');

export function atlassianSearch(params) {
  const clarifaiUrl = `https://clarifai.atlassian.net/wiki/rest/api/content/search?${params}`;
  return fetch(clarifaiUrl, {
      method: 'GET',
      mode: 'cors',
    })
    .then(response => response.json());
}


export function atlassianSearchContent(idAndParams) {
    const clarifaiUrl = `https://clarifai.atlassian.net/wiki/rest/api/content/${idAndParams}`;
    return fetch(clarifaiUrl, {
        method: 'GET',
        mode: 'cors',
      })
      .then(response => response.json());
  }
  