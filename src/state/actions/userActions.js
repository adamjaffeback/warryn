export const setToken = token => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const clearToken = () => ({
  type: 'CLEAR_TOKEN',
});

export const setUser = user => ({
  type: 'SET_USER',
  payload: user,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});
