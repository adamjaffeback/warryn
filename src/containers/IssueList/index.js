import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getIssuesForRepo } from '../../state/thunks/repoThunks';
import IssueCard from '../../components/IssueCard';


const mapState = state => {
  const {user, repos, ui, issues} = state;

  return {
    token: user.token,
    repoName: repos.reduce((acc, repo) => {
      if (repo.selected) {
        return repo.full_name;
      }

      return acc;
    }, ''),
    loading: ui.isLoading,
    issues: issues,
  };
};


function IssueList(props) {
  const {token, repoName, loading, issues, dispatch} = props;

  useEffect(() => {
    if (token) {
      dispatch(getIssuesForRepo(token, repoName));
    }
  }, [dispatch, token, repoName])

  return loading ? (<div>Loading...</div>) : (
    <div>
      {issues.map(issue => {
        return (<IssueCard key={issue.id} issue={issue} />);
      })}
    </div>
  );
}

export default connect(mapState, null)(IssueList);
