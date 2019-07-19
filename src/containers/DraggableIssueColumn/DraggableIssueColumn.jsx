import React, { useEffect } from 'react';
import useWindowSize from '@rehooks/window-size';
import './DraggableIssueColumn.css';
import { connect } from 'react-redux';
import { getIssuesForRepo } from '../../state/thunks/repoThunks';
import { clearIssues, moveIssue } from '../../state/actions/issuesActions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import IssueCard from '../../components/IssueCard/IssueCard';

const mapState = state => {
  const {user, repos, ui, issues} = state;

  return {
    token: user,
    repoName: repos.find(repo => repo.selected).full_name,
    loading: ui.issuesLoading,
    issues: issues,
  };
};

function DraggableIssueColumn(props) {
  const {token, repoName, loading, issues, dispatch} = props;
  const {innerWidth} = useWindowSize();

  useEffect(() => {
    if (token) {
      // clear the current list from the last repo
      dispatch(clearIssues());
      dispatch(getIssuesForRepo(token, repoName));
    }
  }, [dispatch, token, repoName])

  function makeDirections() {
    if (innerWidth < 768) {
      return 'Long hold issue, then drag to reorder.';
    } else {
      return 'Drag issue to reorder.';
    }
  }

  function handleDragEnd(result) {
    const {source, destination} = result;

    if (destination && (source.index !== destination.index)) {
      dispatch(moveIssue(result));
    }
  }

  if (loading) {
    return (<div>Loading...</div>);
  } else {
    return (
      <div className='IssueColumn'>
        <div className='IssueColumn-prompt'>{makeDirections()}</div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='issueColumn'>
            {provided => (
              <div {...provided.droppabedProps} ref={provided.innerRef}>
                {issues.map((issue, index) => {
                  return (<IssueCard key={issue.id} issue={issue} index={index} />);
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </div>
    );
  }
}

export default connect(mapState, null)(DraggableIssueColumn);
