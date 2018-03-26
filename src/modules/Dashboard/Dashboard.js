import React from 'react';
import PropTypes from 'prop-types';

import { CodeEditor, Options, Evaluate, Prettier } from '../../components';

/* CSS */
import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      plugins: ['transform-object-assign', 'transform-object-rest-spread'],
      presets: ['latest', 'stage-3']
    };
  }

  componentDidMount() {
    this.setState({
      el: this.instance
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOptionsChange = options => {
    this.setState({ plugins: options.plugins, presets: options.presets });
  };

  setCode = code => {
    this.setState({
      code: code
    });
  };

  render() {
    const { title } = this.props;
    const { code, plugins, presets, el } = this.state;

    const options = { presets, plugins };

    const handleChange = this.handleChange;
    const handleOptionsChange = this.handleOptionsChange;
    const setCode = this.setCode;

    return (
      <div className="container-dashboard">
        <h1 className="title-dashboard">{title}</h1>
        <div className="textarea-container-dashboard">
          <Options options={options} handleOptionsChange={handleOptionsChange}>
            {typeof el !== 'undefined' && <Evaluate code={code} el={el} />}
            <Prettier code={code} setCode={setCode} />
          </Options>
          <CodeEditor code={code} handleChange={handleChange} />
          <CodeEditor
            code={code}
            handleChange={handleChange}
            options={options}
          />
        </div>
        <iframe
          title={'iFrame'}
          style={{ display: 'none' }}
          ref={el => (this.instance = el)}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  title: PropTypes.string.isRequired
};

export { Dashboard };
