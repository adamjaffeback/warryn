import React from 'react';
import { connect } from 'react-redux';
import './PrioritizePage.css';
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
    <div class='PrioritizePage'>
      <RepoSelector class='PrioritizePage-column' />
      {repoSelected ? <IssueList class='PrioritizePage-column' /> : ''}
    </div>
  );
}

export default connect(mapState, null)(PrioritizePage);
