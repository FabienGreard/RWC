import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* COMPONENTS */
import {
  CodeEditor,
  Options,
  Evaluate,
  Prettier,
  Alert
} from '../../components';

/* ACTIONS */
import { alertActions } from '../../_actions';

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
    this.cleanChange();
  };

  cleanChange = () => {
    this.props.dispatch(alertActions.clear());
  };

  render() {
    const { alert } = this.props;
    const { code, options, el } = this.state;

    const handleChange = this.handleChange;

    return (
      <div className="container-dashboard">
        <Alert alert={alert} />
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

Dashboard.propTypes = {
  alert: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}
const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
