import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* ACTIONS */
import { alertActions } from '../../_actions';

/* CSS */
import './Evaluate.css';

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.state = { isEvaluate: true };
  }

  componentDidMount() {
    if (this.props.el.contentWindow) {
      const window = this.props.el.contentWindow;
      window.onerror = (msg, url, line, column, error) => {
        this.props.dispatch(
          alertActions.error(`${msg.slice(9)}; (${line}:${column})`)
        );
        return true;
      };
    } else {
      const el = document.createElement('iframe');
      Object.defineProperty(this.props.el, 'contentWindow', {
        value: document.body.appendChild(el).contentWindow
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.code !== nextProps.code && this.state.isEvaluate) {
      this.evaluateCode(nextProps.code);
    }
  }

  handleChange = e => {
    const { name, checked } = e.target;
    this.setState(prevState => ({
      [name]: checked
    }));
    if (!this.state.isEvaluate) this.evaluateCode(this.props.code);
  };

  evaluateCode = code => {
    const context = this.props.el.contentWindow.document;
    if (!context.querySelector('script')) {
      const script = document.createElement('script');
      context.body.appendChild(script);
    } else {
      this.deleteScript();
      const script = document.createElement('script');
      context.body.appendChild(script);
    }
    context.querySelector('script').innerHTML = code;
  };

  deleteScript = () => {
    const scriptTag = this.props.el.contentWindow.document.querySelector(
      'script'
    );
    scriptTag.parentNode.removeChild(scriptTag);
  };

  render() {
    const { isEvaluate } = this.state;

    const handleChange = this.handleChange;

    return (
      <div>
        <input
          type="checkbox"
          name="isEvaluate"
          checked={isEvaluate}
          onChange={handleChange}
        />
        <label htmlFor="checkbox">Evaluate</label>
      </div>
    );
  }
}

Evaluate.propTypes = {
  code: PropTypes.string.isRequired,
  el: PropTypes.object.isRequired
};

const connectedEvaluate = connect()(Evaluate);
export { connectedEvaluate as Evaluate };
