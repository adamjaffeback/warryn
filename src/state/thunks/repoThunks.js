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
    dispatch(isLoading({key: 'reposLoading', status: true}));

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
      dispatch(isLoading({key: 'reposLoading', status: false}));
    }
  }
}

function orderIssuesFromSession (repoName, issues) {
  let sessionIssues = JSON.parse(sessionStorage.getItem(repoName));

  // We've previously applied a custom order
  if (sessionIssues) {
    const order = sessionIssues.reduce((acc, issue, index) => {
      acc[issue.id] = index;
      return acc;
    }, {})
    // sort them on the old order
    return issues.sort((a, b) => {
      const aOrder = order[a.id];
      const bOrder = order[b.id];

      // if a is a new issue
      if (aOrder === undefined) {
        // move it up
        return 1;
      // if b is a new issue
      } else if (bOrder === undefined) {
        // move B up
        return -1;
      } else {
        // determine old order
        return aOrder - bOrder;
      }
    });
  // sessionIssues is null if nothing is found in sessionStorage
  } else {
    // just return the issues as GitHub formatted them
    return issues;
  }
}

export function getIssuesForRepo (token, fullRepoName) {
  return async dispatch => {
    dispatch(isLoading({key: 'issuesLoading', status: true}));

    try {
      const issues = [];
      // gather all the issues together
      const addToIssues = data => data.forEach(issue => issues.push(issue));
      // makeRequest resolves when pagination recursion ends
      await makeRequest(
        token,
        `https://api.github.com/repos/${fullRepoName}/issues?filter=all`,
        addToIssues,
      );
      const onlyRepoName = fullRepoName.split('/')[1];
      const orderedIssues = orderIssuesFromSession(onlyRepoName, issues);
      return dispatch(addIssues(orderedIssues));
    } catch (e) {
      const message = `Could not fetch issues for ${fullRepoName}`;
      handleError(message, e, dispatch);
    } finally {
      dispatch(isLoading({key: 'issuesLoading', status: false}))
    }
  }
}
