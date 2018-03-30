import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { transform } from 'babel-standalone';

/* ACTIONS */
import { alertActions } from '../../_actions';

/* CSS */
import './CodeEditor.css';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { code: '', error: '' };
  }

  componentDidMount() {
    this.transpile(this.props.code);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.code !== nextProps.code) {
      this.transpile(nextProps.code);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.options && nextState.error) {
      this.props.dispatch(alertActions.error(nextState.error.toString()));
    }
  }

  transpile = code => {
    try {
      this.setState({
        code: transform(code, {
          ast: false,
          plugins: this.props.options.plugins,
          presets: this.props.options.presets
        }).code,
        error: ''
      });
    } catch (error) {
      this.setState({
        code: code,
        error: error
      });
    }
  };

  render() {
    const { handleChange, options } = this.props;
    const { code, error } = this.state;

    const name = options ? 'codeCompile' : 'code';
    // show error inside textarea temp
    const value = error && options ? error : code;

    return (
      <textarea
        className={'code-editor ' + name}
        name={name}
        value={value}
        onChange={handleChange}
      />
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.object
};

const connectedCodeEditor = connect()(CodeEditor);
export { connectedCodeEditor as CodeEditor };
