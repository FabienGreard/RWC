import React from "react";
import PropTypes from 'prop-types';

import { transform } from 'babel-standalone';

/* CSS */
import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: "", plugins: ["transform-object-rest-spread", "transform-object-assign"], presets: ["latest"] };
  }

  transpile = code => {
    try {
      return transform(code, {
        ast: false,
        plugins: this.state.plugins,
        presets: this.state.presets
      }).code;
    } catch (error) {
      return error;
    }
  }

  execute = () => {
    try {
      console.log(eval(this.state.code));
    } catch (error) {
      console.log(eval(this.state.code));
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { title } = this.props;
    const { code } = this.state

    const handleChange = this.handleChange;
    const transpile = this.transpile;
    const execute = this.execute;

    return (
      <div className="container-dashboard">
        <h1 className="title-dashboard">{title}</h1>
        <div className="textarea-container-dashboard">
          <textarea name="code" value={code} onChange={handleChange}></textarea>
          <textarea value={transpile(code)} disabled></textarea>
        </div>
        <input type="submit" onClick={execute}/>
      </div>
    );
  }

}

export default Dashboard;

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
}

export { Dashboard };
