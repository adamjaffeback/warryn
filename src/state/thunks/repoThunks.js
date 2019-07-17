import axios from 'axios';
import { isLoading, logError, clearError } from '../actions/uiActions';
import { addRepos } from '../actions/reposActions';

function getNextReposUrl (nextHeader) {
  const parts = nextHeader.split(',');

  for (let i = 0; i < parts.length; i++) {
    let part = parts[i].split(';');
    let rel = part[1].trim();
    let linkLabel = rel.substring(5, rel.length - 1);

    if (linkLabel === 'next') {
      let url = part[0].trim();
      return url.substring(1, url.length - 1);
    }
  }

  return false;
}

async function makeRequest (token, url, dispatch) {
  const config = {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  };
  const response = await axios.get(url, config);
  dispatch(addRepos(response.data));

  if (typeof response.headers.link === 'string') {
    const nextUrl = getNextReposUrl(response.headers.link);

    if (nextUrl) {
      return makeRequest(token, nextUrl, dispatch);
    }
  }

  return;
}

export function getReposForUser (token) {
  return async dispatch => {
    dispatch(isLoading(true));

    try {
      return await makeRequest(token, 'https://api.github.com/user/repos', dispatch);
    } catch (e) {
      const message = 'Could not fetch repos for user';
      console.error(message, e);
      dispatch(logError(message));
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    } finally {
      dispatch(isLoading(false));
    }
  }
}
