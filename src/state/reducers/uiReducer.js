const defaultState = {
  isLoading: false,
  error: undefined,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
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
