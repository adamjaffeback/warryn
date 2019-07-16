const defaultState = {
  token: undefined,
  user: undefined,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'CLEAR_TOKEN':
      return {
        ...state,
        token: undefined,
      };
    case 'SET_USER' :
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: undefined,
      };
  default:
   return state;
  }
}
