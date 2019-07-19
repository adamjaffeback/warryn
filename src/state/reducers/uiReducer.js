const defaultState = {
  reposLoading: false,
  issuesLoading: false,
  error: undefined,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      const nextState = {...state};
      const {key, status} = action.payload;

      nextState[key] = status;
      return nextState;
    case 'LOG_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: undefined,
      };
    default:
     return state;
  }
}
