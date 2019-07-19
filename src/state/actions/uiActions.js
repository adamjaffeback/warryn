export const isLoading = loadingDescription => ({
  type: 'IS_LOADING',
  payload: loadingDescription,
});

export const logError = error => ({type: 'LOG_ERROR', payload: error});

export const clearError = () => ({type: 'CLEAR_ERROR'});
