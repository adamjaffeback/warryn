import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from '../../state/store';
import { HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import AuthPage from '../AuthPage';
import PrioritizePage from '../PrioritizePage';

function App() {
  return (
    <Provider store={store()}>
      <Router>
        <Switch>
          <Route path="/auth" exact component={AuthPage} />
          <Route path="/prioritize" component={PrioritizePage} />
          <Redirect from='*' to='/auth' />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
