import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './state/store';
import App from './containers/App';
import AuthPage from './pages/AuthPage';
import PrioritizePage from './pages/PrioritizePage';

function AppRouter() {
  return (
    <Provider store={store()}>
      <Router>
        <Route path="/" exact component={App} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/prioritize" component={PrioritizePage} />
      </Router>
    </Provider>
  );
}

export default AppRouter;
