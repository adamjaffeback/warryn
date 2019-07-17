export const addIssues = issues => ({
  type: 'ADD_ISSUES',
  payload: issues,
});

export const moveIssue = dragDropResult => ({
  type: 'MOVE_ISSUE',
  payload: dragDropResult,
});
