import axios from 'axios';
import { isLoading, logError, clearError } from '../actions/uiActions';
import { addRepos } from '../actions/reposActions';
import { addIssues } from '../actions/issuesActions';

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

async function makeRequest (token, url, onData) {
  const config = {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  };
  const response = await axios.get(url, config);
  onData(response.data);

  if (typeof response.headers.link === 'string') {
    const nextUrl = getNextReposUrl(response.headers.link);

    if (nextUrl) {
      return makeRequest(token, nextUrl, onData);
    }
  }

  return;
}

function handleError (message, error, dispatch) {
  console.error(message, error);
  dispatch(logError(message));
  setTimeout(() => {
    dispatch(clearError());
  }, 5000);
}

export function getReposForUser (token) {
  return async dispatch => {
    dispatch(isLoading(true));

    try {
      return await makeRequest(
        token,
        'https://api.github.com/user/repos',
        data => dispatch(addRepos(data)),
      );
    } catch (e) {
      const message = 'Could not fetch repos for user';
      handleError(message, e, dispatch);
    } finally {
      dispatch(isLoading(false));
    }
  }
}

export function getIssuesForRepo (token, fullRepoName) {
  return async dispatch => {
    dispatch(isLoading(true));

    try {
      return await makeRequest(
        token,
        `https://api.github.com/repos/${fullRepoName}/issues?filter=all`,
        data => dispatch(addIssues(data)),
      );
    } catch (e) {
      const message = `Could not fetch issues for ${fullRepoName}`;
      handleError(message, e, dispatch);
    } finally {
      dispatch(isLoading(false));
    }
  }
}
