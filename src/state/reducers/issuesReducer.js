export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ISSUES':
      return [
        ...state,
        ...action.payload,
      ];
    case 'MOVE_ISSUE':
      const {source, destination} = action.payload;
      const newIssues = [...state];
      const movedIssue = newIssues.splice(source.index, 1)[0];
      newIssues.splice(destination.index, 0, movedIssue);

      // get the name of the repo to use as the sessionStorage key
      const repoUrlParts = movedIssue.repository_url.split('/');
      const repoName = repoUrlParts[repoUrlParts.length - 1];
      sessionStorage.setItem(repoName, JSON.stringify(newIssues));

      return newIssues;
    case 'CLEAR_ISSUES':
      return [];
  default:
   return state;
  }
}
