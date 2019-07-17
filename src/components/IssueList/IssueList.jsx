import React from 'react';
import IssueCard from '../IssueCard/IssueCard';
import { Droppable } from 'react-beautiful-dnd';

function IssueList({issues}) {
  return (
    <Droppable droppableId='issueColumn'>
      {provided => (
        <div {...provided.droppabedProps} ref={provided.innerRef}>
          {issues.map((issue, index) => <IssueCard key={issue.id} issue={issue} index={index} />)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default IssueList;
