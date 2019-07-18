import React from 'react';
import './IssueCard.css';
import { Draggable } from 'react-beautiful-dnd';

function Avatar({srcUrl}) {
  return (
    <React.Fragment>
      <img src={srcUrl} alt='Gravitar' className='IssueCard-avatar' />
    </React.Fragment>
  );
}

function CardContents ({issue, provided}) {
  const {assignee} = issue;

  return (
    <div
      className='IssueCard'
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <div className='IssueCard-title-row'>
        {assignee ? <Avatar srcUrl={assignee.avatar_url} /> : <div />}
        <div className='IssueCard-title'>{issue.title}</div>
      </div>
      <div className='IssueCard-timestampRow'>
        <div>Created {issue.created_at}</div>
        <div>Updated {issue.updated_at} ago</div>
      </div>
    </div>
  );
}

function IssueCard({issue, index}) {
  return (
    <Draggable draggableId={issue.id} index={index}>
      {provided => (
        <CardContents issue={issue} provided={provided} />
      )}
    </Draggable>
  );
}

export default IssueCard;
