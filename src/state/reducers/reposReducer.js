export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_REPOS':
      return [
        ...state,
        ...action.payload.map(repo => {
          repo.selected = false;
          return repo;
        }),
      ];
    case 'SELECT_REPO':
      return state.map(repo => {
        if (repo.id === action.payload) {
          repo.selected = true;
        } else {
          repo.selected = false;
        }

        return repo;
      });
    case 'CLEAR_REPO_SELECTION':
      return state.map(repo => {
        repo.selected = false;
        return repo;
      });
    case 'CLEAR_REPOS':
      return [];
  default:
   return state;
  }
}
