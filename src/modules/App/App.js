import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom'

/* ACTIONS */
import { alertActions } from '../../_actions';

/* HELPERS */
import { history } from '../../helpers';

/* COMPONENTS */
import { Alert } from '../../components';

/* MODULES */
import { Dashboard } from '../';

/* CSS */
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    //listen on url change
    history.listen((location, action) => {
      // clear alert on location change
      props.dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <Alert alert={alert}/>
        <Switch>
          <Route exact path='/' render={(props) => <Dashboard {...props} title={`Path : ${props.location.pathname}`} />}/>
          {/* Redirect to Dashboard if no match */}
          <Redirect to='/'/>
        </Switch>
      </div>
    );
  }

}

App.propTypes = {
  alert: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
