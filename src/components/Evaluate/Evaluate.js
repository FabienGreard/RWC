import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* CSS */
import './Evaluate.css';

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.state = { isEvaluate: false };
  }

  componentDidMount() {
    if(this.props.el.contentWindow){
      const window = this.props.el.contentWindow
      window.onerror = (msg, url, line, column, error) => {
        console.log(`${msg.slice(9)}; (${line}:${column})`);
        return true;
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.code !== nextProps.code && this.state.isEvaluate){
      this.evaluateCode(nextProps.code);
    }
  }

  handleChange = e => {
    const { name, checked } = e.target;
    this.setState( prevState => ({
      [name]: checked
    }));
    if(!this.state.isEvaluate) this.evaluateCode(this.props.code)
  }

  evaluateCode = (code) => {
    const context = this.props.el.contentWindow.document;
    if(!context.querySelector("script")){
      const script = document.createElement("script");
      context.body.appendChild(script);
    }else{
      this.deleteScript();
      const script = document.createElement("script");
      context.body.appendChild(script);
    }
      context.querySelector("script").innerHTML = code;
  }

  deleteScript = () => {
    const scriptTag = this.props.el.contentWindow.document.querySelector("script");
    scriptTag.parentNode.removeChild(scriptTag);
  }

  render() {
    const { isEvaluate } = this.state;

    const handleChange = this.handleChange;

    return (
      <div>
        <input type="checkbox" name="isEvaluate" checked={isEvaluate} onChange={handleChange}/>
        <label htmlFor="checkbox">Evaluate</label>
      </div>
    );
  }

}

Evaluate.propTypes = {
  code: PropTypes.string.isRequired,
  el: PropTypes.object.isRequired
};

export { Evaluate };
