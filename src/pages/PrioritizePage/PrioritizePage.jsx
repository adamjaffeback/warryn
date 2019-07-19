import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './PrioritizePage.css';
import RepoSelector from '../../containers/RepoSelector/RepoSelector';
import DraggableIssueColumn from '../../containers/DraggableIssueColumn/DraggableIssueColumn';

const mapState = state => ({
  repoSelected: state.repos.find(repo => repo.selected),
});

function PrioritizePage({repoSelected}) {
  return (
    <div className='PrioritizePage'>
      <RepoSelector />
      {repoSelected ? <DraggableIssueColumn /> : ''}
    </div>
  );
}

PrioritizePage.propTypes = {
  repoSelected: PropTypes.object,
};

PrioritizePage.defaultProps = {
  repoSelected: null,
};

export default connect(mapState, null)(PrioritizePage);
