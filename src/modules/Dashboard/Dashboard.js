import React from "react";
import PropTypes from 'prop-types';

import { CodeEditor } from '../../components';

/* CSS */
import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: "", plugins: ["transform-object-rest-spread", "transform-object-assign"], presets: ["latest"] };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { title } = this.props;
    const { code, plugins, presets } = this.state

    const handleChange = this.handleChange;

    return (
      <div className="container-dashboard">
        <h1 className="title-dashboard">{title}</h1>
        <div className="textarea-container-dashboard">
          <CodeEditor code={code} handleChange={handleChange}/>
          <CodeEditor code={code} handleChange={handleChange} options={{plugins, presets}} />
        </div>
      </div>
    );
  }

}

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
}

export { Dashboard };
