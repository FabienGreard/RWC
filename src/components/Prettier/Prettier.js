import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as beautify from 'js-beautify';

/* CSS */
import './Prettier.css';

class Prettier extends Component {
  constructor(props) {
    super(props);
    this.state = { isPrettier: false };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.code !== nextProps.code && this.state.isPrettier) {
      this.prettierCode(nextProps.code);
    }
  }

  handleChange = e => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
    if (!this.state.isPrettier) this.prettierCode(this.props.code);
  };

  prettierCode = code => {
    this.props.setCode(beautify.js(code, { indent_size: 2 }));

    this.setState({
      isPrettier: false
    });
  };

  render() {
    const { isPrettier } = this.state;

    const handleChange = this.handleChange;

    return (
      <div>
        <input
          type="checkbox"
          name="isPrettier"
          checked={isPrettier}
          onChange={handleChange}
        />
        <label htmlFor="checkbox">Prettier</label>
      </div>
    );
  }
}

Prettier.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired
};

export { Prettier };
