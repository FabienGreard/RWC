import React from 'react';

/* COMPONENTS */
import { CodeEditor, Options, Evaluate, Prettier } from '../../components';

/* CSS */
import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '', //javascript
      options: {
        presets: ['latest', 'stage-3'],
        plugins: ['transform-object-assign', 'transform-object-rest-spread']
      }, //babel options
      el: undefined //iframe dom element reference
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

  render() {
    const { title } = this.props;
    const { code, options, el } = this.state;

    const handleChange = this.handleChange;

    return (
      <div className="container-dashboard">
        <h1 className="title-dashboard">{title}</h1>
        <div className="textarea-container-dashboard">
          <Options options={options} handleChange={handleChange}>
            {typeof el !== 'undefined' && <Evaluate code={code} el={el} />}
            <Prettier code={code} handleChange={handleChange} />
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

export { Dashboard };
