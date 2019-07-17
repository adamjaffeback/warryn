import React from 'react';
import './IssueCard.css';

function IssueCard({issue}) {
  return (
    <div className='IssueCard'>
      <div>{issue.title}</div>
      <div>Assigned: {issue.user ? issue.user.login : 'Unassigned'}</div>
    </div>
  );
}

export default IssueCard;
