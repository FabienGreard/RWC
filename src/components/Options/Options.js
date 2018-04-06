import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* HELPERS */
import { optionsMock } from '../../helpers';

/* ACTIONS */
import { optionsActions } from '../../_actions';

/* CSS */
import './Options.css';

const optionsIsChecked = options => {
  let optionsChecked = {};
  Object.keys(options).map(list =>
    options[list].map(
      option =>
        (optionsChecked[list] = {
          ...optionsChecked[list],
          [option]: true
        })
    )
  );

  return optionsChecked;
};

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsList: optionsMock, // list of options
      optionsChecked: optionsIsChecked(optionsMock) // options with booleans
    };
  }

  handleChange = (e, list) => {
    const { name, checked } = e.target;
    this.setState(
      {
        optionsChecked: {
          ...this.state.optionsChecked,
          [list]: { ...this.state.optionsChecked[list], [name]: checked }
        }
      },
      () => {
        let options = {};
        Object.keys(this.state.optionsChecked).map(
          list =>
            (options[list] = Object.keys(
              this.state.optionsChecked[list]
            ).filter(key => this.state.optionsChecked[list][key]))
        );
        this.props.dispatch(optionsActions.update(options));
      }
    );
  };

  render() {
    const { children } = this.props;
    const { optionsList, optionsChecked } = this.state;

    const handleChange = this.handleChange;

    return (
      <div>
        <div>
          <h1>Settings</h1>
          {children}
        </div>
        {optionsList &&
          optionsChecked &&
          Object.keys(optionsList).map(list => (
            <div key={list}>
              <h1>{list}</h1>
              <Checkbox
                list={optionsList[list]}
                listChecked={optionsChecked[list]}
                category={list}
                handleChange={handleChange}
              />
            </div>
          ))}
      </div>
    );
  }
}

const Checkbox = ({ list, listChecked, category, handleChange }) =>
  list &&
  list.map(val => (
    <div key={val}>
      <input
        type="checkbox"
        name={val}
        checked={listChecked[val]}
        onChange={e => handleChange(e, category)}
      />
      <label htmlFor={val}>{val}</label>
    </div>
  ));

Checkbox.propTypes = {
  list: PropTypes.array.isRequired,
  listChecked: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

Options.propTypes = {
  options: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const options = state.options.items ? state.options.items : {};
  return {
    options
  };
}

const connectedOptions = connect(mapStateToProps)(Options);
export { connectedOptions as Options };
