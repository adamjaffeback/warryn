import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getReposForUser } from '../../state/thunks/repoThunks';


const mapState = state => {
  const {user, repos, ui} = state;

  return {
    token: user.token,
    repos: repos,
    loading: ui.isLoading,
  };
};

function RepoSelector({token, repos, loading, dispatch, history}) {
  useEffect(() => {
    dispatch(getReposForUser(token));
  }, [dispatch, token])

  if (token) {
    return loading ? (<div>Loading...</div>) : (
      <div>
        <div>Got repos</div>
        <ul>
          {repos.map(repo => {
            return (<li>{repo.name}</li>);
          })}
        </ul>
      </div>
    );
  } else {
    history.push('/auth');
  }
}

export default connect(mapState, null)(withRouter(RepoSelector));
