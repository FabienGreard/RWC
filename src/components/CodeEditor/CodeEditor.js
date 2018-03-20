import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { transform } from 'babel-standalone';

/* CSS */
import './CodeEditor.css';

class CodeEditor extends Component {
  transpile = code => {
    try {
      return transform(code, {
        ast: false,
        plugins: this.props.options.plugins,
        presets: this.props.options.presets
      }).code;
    } catch (error) {
      return error;
    }
  }

  render() {
    const { code, handleChange, options } = this.props;

    const isTranspile = Boolean(options);
    const transpile = this.transpile;
    const naming = isTranspile ? "codeCompile" : "code";

    return (
      <textarea className={'code-editor ' + naming} name={naming} value={isTranspile ? transpile(code) : code} onChange={handleChange}></textarea>
    );
  }

}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.object,
};

export { CodeEditor };
