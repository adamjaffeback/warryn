import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getIssuesForRepo } from '../../state/thunks/repoThunks';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import IssueCard from '../../components/IssueCard/IssueCard';

const mapState = state => {
  const {user, repos, ui, issues} = state;

  return {
    token: user.token,
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
      dispatch(getIssuesForRepo(token, repoName));
    }
  }, [dispatch, token, repoName])

  function handleDragEnd() {
    console.log('dropped');
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
