import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

/* ACTIONS */
import { alertActions } from '../../_actions';

/* HELPERS */
import { history } from '../../helpers';

/* MODULES */
import { Dashboard } from '../';

/* CSS */
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    //listen on url change
    history.listen((location, action) => {
      // clear alert on location change
      props.dispatch(alertActions.clear());
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={props => <Dashboard {...props} />} />
          {/* Redirect to Dashboard if no match */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const withRouterConnectedApp = withRouter(connect()(App));
export { withRouterConnectedApp as App };
