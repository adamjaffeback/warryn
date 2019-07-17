import React from 'react';
import { connect } from 'react-redux';
import './PrioritizePage.css';
import RepoSelector from '../../containers/RepoSelector';
import DraggableIssueColumn from '../../containers/DraggableIssueColumn/DraggableIssueColumn';

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
    <div className='PrioritizePage'>
      <RepoSelector className='PrioritizePage-column' />
      {repoSelected ? <DraggableIssueColumn class='PrioritizePage-column' /> : ''}
    </div>
  );
}

export default connect(mapState, null)(PrioritizePage);
