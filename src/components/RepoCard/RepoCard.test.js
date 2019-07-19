import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import RepoCard from './RepoCard';

const repo = {
  id: 1,
  name: 'warryn',
  open_issues: 1,
  selected: false,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RepoCard repo={repo} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should enable the card if the repo has open issues', () => {
  const enabledCard = renderer
   .create(<RepoCard repo={repo} />)
   .toJSON();
 expect(enabledCard).toMatchSnapshot();
});

it('should disable the card if the repo has no open issues', () => {
  const disabledCard = renderer
   .create(<RepoCard repo={{...repo, open_issues: 0}} />)
   .toJSON();
 expect(disabledCard).toMatchSnapshot();
});

it('should not apply a selected class', () => {
  const unselectedCard = renderer
   .create(<RepoCard repo={repo} />)
   .toJSON();
 expect(unselectedCard).toMatchSnapshot();
});

it('should apply a selected class', () => {
  const selectedCard = renderer
   .create(<RepoCard repo={{...repo, selected: true}} />)
   .toJSON();
 expect(selectedCard).toMatchSnapshot();
});
