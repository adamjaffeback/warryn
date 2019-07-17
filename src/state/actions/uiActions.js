export const isLoading = loading => ({type: 'IS_LOADING', payload: loading});

export const logError = error => ({type: 'LOG_ERROR', payload: error});

export const clearError = () => ({type: 'CLEAR_ERROR'});
