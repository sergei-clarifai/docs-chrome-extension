export function saveToLocal(name, values) {
  localStorage.setItem(name, JSON.stringify(values));
}

export function loadFromLocal(name) {
  return localStorage[name] ? JSON.parse(localStorage[name]) : {};
}

export function getReposListSaveTime() {
  return localStorage.repos_list_save_time;
}

export function loadReposListFromLocal() {
  return localStorage.repos_list ? JSON.parse(localStorage.repos_list) : {};
}

export function saveReposListToLocal(values) {
  localStorage.setItem('repos_list_save_time', (+new Date()).toString());
  localStorage.setItem('repos_list', JSON.stringify(values));
}
