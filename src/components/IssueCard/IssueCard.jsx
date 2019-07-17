import React from 'react';
import './IssueCard.css';
import { Draggable } from 'react-beautiful-dnd';

function IssueCard({issue, index}) {
  return (
    <Draggable draggableId={issue.id} index={index}>
      {provided => (
        <div
          className='IssueCard'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>{issue.title}</div>
          <div>{issue.assignee ? `Assigned: ${issue.assignee.login}` : 'Unassigned'}</div>
        </div>
      )}
    </Draggable>
  );
}

export default IssueCard;
