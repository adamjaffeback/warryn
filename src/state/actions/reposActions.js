export const addRepos = repos => ({
  type: 'ADD_REPOS',
  payload: repos,
});

export const selectRepo = repoId => ({
  type: 'SELECT_REPO',
  payload: repoId,
});

export const clearRepoSelection = () => ({type: 'CLEAR_REPO_SELECTION'});

export const clearRepos = () => ({type: 'CLEAR_REPOS'});
