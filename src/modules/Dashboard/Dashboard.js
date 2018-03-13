import React from "react";
import PropTypes from 'prop-types';

/* CSS */
import './Dashboard.css';

const Dashboard = ({title}) => (
  <h1 className="title-Dashboard">{title}</h1>
);

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
}

export { Dashboard };
