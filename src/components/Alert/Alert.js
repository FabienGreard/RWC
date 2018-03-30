import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* CSS */
import './Alert.css';

class Alert extends Component {
  render() {
    const { alert } = this.props;
    return (
      <textarea className="alert-msg" value={alert && alert.message} readOnly />
    );
  }
}

Alert.propTypes = {
  alert: PropTypes.object
};

export { Alert };
