import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { transform } from 'babel-standalone';

/* ACTIONS */
import { alertActions, optionsActions } from '../../_actions';

/* CSS */
import './CodeEditor.css';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { code: '', error: '' };
    props.dispatch(optionsActions.receive());
  }

  componentDidMount() {
    if (!this.props.handleChange) {
      this.transpile(this.props.code, this.props.options);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.handleChange) {
      this.transpile(nextProps.code, nextProps.options);
    } else {
      this.setState({
        code: nextProps.code
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.handleChange && nextState.error) {
      this.props.dispatch(alertActions.error(nextState.error.message));
    }
  }

  transpile = (code, options) => {
    try {
      this.setState({
        code: transform(code, {
          ast: false,
          plugins: options.plugins,
          presets: options.presets
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
    const { handleChange } = this.props;
    const { code, error } = this.state;

    const name = !handleChange ? 'codeCompile' : 'code';
    // show error inside textarea temp
    const value = error && !handleChange ? error : code;

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
  handleChange: PropTypes.func,
  options: PropTypes.object
};

function mapStateToProps(state) {
  const options = state.options.items ? state.options.items : {};
  return {
    options
  };
}

const connectedCodeEditor = connect(mapStateToProps)(CodeEditor);
export { connectedCodeEditor as CodeEditor };
