import React from 'react';
import PropTypes from 'prop-types';
import './IssueCard.css';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';

function Avatar({srcUrl}) {
  return (
    <React.Fragment>
      <img src={srcUrl} alt='Gravitar' className='IssueCard-avatar' />
    </React.Fragment>
  );
}

Avatar.propTypes = {
  srcUrl: PropTypes.string.isRequired,
};

function CardContents ({issue, provided}) {
  const {assignee} = issue;
  const created = moment(issue.created_at).format('MM/DD/YYYY');
  const updatedAgo = moment(issue.updated_at).from(moment());

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
        <div>Created {created}</div>
        <div>Updated {updatedAgo}</div>
      </div>
    </div>
  );
}

CardContents.propTypes = {
  issue: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
};

function IssueCard({issue, index}) {
  return (
    <Draggable draggableId={issue.id} index={index}>
      {provided => (
        <CardContents issue={issue} provided={provided} />
      )}
    </Draggable>
  );
}

IssueCard.propTypes = {
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default IssueCard;
