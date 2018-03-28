import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as beautify from 'js-beautify';

/* CSS */
import './Prettier.css';

class Prettier extends Component {
  prettierCode = code => {
    this.props.handleChange({
      target: { name: 'code', value: beautify.js(code, { indent_size: 2 }) }
    });
  };

  render() {
    const prettierCode = this.prettierCode;

    return (
      <input
        type="button"
        name="isPrettier"
        onClick={prettierCode}
        value="Prettier"
      />
    );
  }
}

Prettier.propTypes = {
  code: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export { Prettier };
