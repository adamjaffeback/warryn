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
      return newIssues;
  default:
   return state;
  }
}
