import React from 'react';
import './RepoCard.css';

function RepoCard({repo, clickCard}) {
  const isDisabled = repo.open_issues ? '' : 'disabled';
  const isSelected = repo.selected ? 'selected' : '';
  const classes = `RepoCard ${isDisabled} ${isSelected}`;

  function handleClick () {
    if (repo.open_issues > 0) {
      clickCard(repo.id);
    }
  }

  return (
    <div className={classes} onClick={handleClick}>
      <div className='RepoCard-title'>{repo.name}</div>
      <div className='RepoCard-issue-count'>{repo.open_issues} open issues</div>
    </div>
  );
}

export default RepoCard;
