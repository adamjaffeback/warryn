import React from 'react';
import { connect } from 'react-redux';
import RepoSelector from '../../containers/RepoSelector';
import IssueList from '../../containers/IssueList';

const mapState = state => ({
  repoSelected: state.repos.reduce((acc, repo) => {
    if (repo.selected) {
      return true;
    }

    return acc;
  }, false),
});

function PrioritizePage({repoSelected}) {
  return (
    <div>
      <RepoSelector />
      {repoSelected ? <IssueList /> : ''}
    </div>
  );
}

export default connect(mapState, null)(PrioritizePage);
