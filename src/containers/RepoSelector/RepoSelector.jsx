import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getReposForUser } from '../../state/thunks/repoThunks';
import { selectRepo } from '../../state/actions/reposActions';
import './RepoSelector.css';
import RepoCard from '../../components/RepoCard/RepoCard';

const mapState = state => {
  const {user, repos, ui} = state;
  // put the repos with issues on top
  const [hasIssues, noIssues] = repos.reduce((acc, repo) => {
    if (repo.open_issues) {
      acc[0].push(repo);
    } else {
      acc[1].push(repo);
    }

    return acc;
  }, [[], []]);

  return {
    token: user,
    repos: [...hasIssues, ...noIssues],
    loading: ui.isLoading,
    repoSelected: repos.find(repo => repo.selected),
  };
};

function RepoSelector(props) {
  const {token, repos, loading, dispatch, history, repoSelected} = props;

  let gridLocation = repoSelected ? {gridArea: 'left'} : {gridArea: 'center'};

  useEffect(() => {
    if (token) {
      dispatch(getReposForUser(token));
    }
  }, [dispatch, token])

  if (token) {
    return loading ? (<div style={gridLocation}>Loading...</div>) : (
      <div style={gridLocation} className='RepoSelector-column'>
        <div className="RepoSelector-prompt">Click a repo to view its issues:</div>
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
