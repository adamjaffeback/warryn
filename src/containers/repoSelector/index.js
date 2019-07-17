import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getReposForUser } from '../../state/thunks/repoThunks';
import { selectRepo } from '../../state/actions/reposActions';
import RepoCard from '../../components/RepoCard';


const mapState = state => {
  const {user, repos, ui} = state;

  return {
    token: user.token,
    repos: repos,
    loading: ui.isLoading,
  };
};


function RepoSelector(props) {
  const {token, repos, loading, dispatch, history} = props;

  useEffect(() => {
    if (token) {
      dispatch(getReposForUser(token));
    }
  }, [dispatch, token])

  if (token) {
    return loading ? (<div>Loading...</div>) : (
      <div>
        {repos.map(repo => {
          return (<RepoCard key={repo.id} clickCard={() => dispatch(selectRepo(repo.id))} repo={repo} />);
        })}
      </div>
    );
  } else {
    history.push('/auth');
    return <span></span>
  }
}

export default connect(mapState, null)(withRouter(RepoSelector));
