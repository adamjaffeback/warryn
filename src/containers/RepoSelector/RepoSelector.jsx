import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useWindowSize from '@rehooks/window-size';
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
    loading: ui.reposLoading,
    repoSelected: repos.find(repo => repo.selected),
  };
};

function RepoSelector(props) {
  const {innerWidth} = useWindowSize();
  const {token, repos, loading, dispatch, history, repoSelected} = props;

  function determineStyle() {
    // if no repo is selected
    if (!repoSelected) {
      // plop the selector right in the middle of the page as an easy-to-access column
      return {gridArea: 'center', flexDirection: 'column'};
    }

    // repo selected, issues showing
    if (innerWidth < 768) {
      // small device, put the repo selector up top
      // make it a row, and scroll
      return {gridArea: 'top', flexDirection: 'row', overflowX: 'scroll'};
    } else {
      // large device
      // keep formatting the same, just move it to the left side
      return {gridArea: 'left', flexDirection: 'column'};
    }
  }

  // on first render
  useEffect(() => {
    if (token) {
      dispatch(getReposForUser(token));
    }
  }, [dispatch, token])

  if (token) {
    if (loading) {
      return (<div style={determineStyle()}>Loading...</div>);
    } else {
      return (
        <div className='RepoSelector' style={{gridArea: determineStyle().gridArea}}>
          <div className="RepoSelector-prompt">Click a repo to view its issues:</div>
          <div style={determineStyle()} className='RepoSelector-column'>
            {repos.map(repo => {
              return (
                <RepoCard
                  key={repo.id}
                  clickCard={() => dispatch(selectRepo(repo.id))}
                  repo={repo} />
              );
            })}
          </div>
        </div>
      );
    }
  // no token, send user back to auth
  } else {
    history.push('/auth');
    // must return html
    return (<span></span>);
  }
}

RepoSelector.propTypes = {
  token: PropTypes.string,
  repos: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  repoSelected: PropTypes.object,
};

RepoSelector.defaultProps = {
  token: false,
  repos: [],
  loading: false,
  repoSelected: null,
};

export default connect(mapState, null)(withRouter(RepoSelector));
