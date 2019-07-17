export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ISSUES':
      const orderIndexStart = state.length ? state.length : 0;
      const newIssues = action.payload.reduce((acc, issue) => {
        let [index, wipIssueList] = acc;
        wipIssueList.push({
          ...issue,
          order: index,
        });
        index++;
        return acc;
      }, [orderIndexStart, []])[1];

      return [
        ...state,
        ...newIssues,
      ];
  default:
   return state;
  }
}
