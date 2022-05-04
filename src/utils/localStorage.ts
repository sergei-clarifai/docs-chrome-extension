export function saveToLocal(name: string, values: any): void {
  localStorage.setItem(name, JSON.stringify(values));
}

export function loadFromLocal(name: string): any {
  return localStorage[name] ? JSON.parse(localStorage[name]) : {};
}

export function getReposListSaveTime(): any {
  return localStorage.repos_list_save_time;
}

export function loadReposListFromLocal(): any {
  return localStorage.repos_list ? JSON.parse(localStorage.repos_list) : {};
}

export function saveReposListToLocal(values: any): void {
  localStorage.setItem('repos_list_save_time', (+new Date()).toString());
  localStorage.setItem('repos_list', JSON.stringify(values));
}
