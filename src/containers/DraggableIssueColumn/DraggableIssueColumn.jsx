import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getIssuesForRepo } from '../../state/thunks/repoThunks';
import { clearIssues, moveIssue } from '../../state/actions/issuesActions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import IssueCard from '../../components/IssueCard/IssueCard';

const mapState = state => {
  const {user, repos, ui, issues} = state;

  return {
    token: user,
    repoName: repos.reduce((acc, repo) => {
      if (repo.selected) {
        return repo.full_name;
      }

      return acc;
    }, ''),
    loading: ui.isLoading,
    issues: issues,
  };
};

function DraggableIssueColumn(props) {
  const {token, repoName, loading, issues, dispatch} = props;

  useEffect(() => {
    if (token) {
      // clear the current list from the last repo
      dispatch(clearIssues());
      dispatch(getIssuesForRepo(token, repoName));
    }
  }, [dispatch, token, repoName])

  function handleDragEnd(result) {
    const {source, destination} = result;

    if (destination && (source.index !== destination.index)) {
      dispatch(moveIssue(result));
    }
  }

  return loading ? (<div>Loading...</div>) : (
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
  );
}

export default connect(mapState, null)(DraggableIssueColumn);
