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
      <div>{repo.name}</div>
      <div>Open Issues: {repo.open_issues}</div>
    </div>
  );
}

export default RepoCard;
