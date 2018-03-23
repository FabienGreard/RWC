import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* CSS */
import './Options.css';

const optionsIsChecked = (options) => {
  let optionsChecked = {};
  Object.keys(options).map(list => options[list].map(option => optionsChecked[list] = {
    ...optionsChecked[list],
    [option]: true
  }));

  return optionsChecked;
}

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = { optionsList: { ...props.options }, optionsChecked: optionsIsChecked(props.options) };
  }


  componentWillReceiveProps(nextProps) {
    if(this.props.options !== nextProps.options){
      this.setState(prevState => ({
        optionsList : { ...nextProps.options, ...prevState.optionsList }
      }));
    }
  }

  handleOptionsChange = (e, list) => {
    const { name, checked } = e.target;
    this.setState({ optionsChecked: { ...this.state.optionsChecked, [list]: { ...this.state.optionsChecked[list], [name]: checked } } }, () => {
      let options = {};
      Object.keys(this.state.optionsChecked).map(list => (
        options[list] = Object.keys(this.state.optionsChecked[list]).filter(key => this.state.optionsChecked[list][key])
      ));
      this.props.handleOptionsChange(options);
    });
  }

  render() {
    const { children } = this.props;
    const { optionsList, optionsChecked } = this.state;

    const handleOptionsChange = this.handleOptionsChange;

    return (
      <div>
        <div>
          <h1>Settings</h1>
          {children}
        </div>
        {
          optionsList && optionsChecked && Object.keys(optionsList).map(list =>
            (
              <div key={list}>
                <h1>{list}</h1>
                <Checkbox list={optionsList[list]} listChecked={optionsChecked[list]} category={list} handleOptionsChange={handleOptionsChange}/>
              </div>
            )
          )
        }
      </div>
    );
  }

}

const Checkbox = ({list, listChecked, category, handleOptionsChange}) => (
  list && list.map(val =>
    (
      <div key={val}>
        <input type="checkbox" name={val} checked={listChecked[val]} onChange={e => handleOptionsChange(e, category)}/>
        <label htmlFor={val}>{val}</label>
      </div>
    )
  )
)

Checkbox.propTypes = {
  list: PropTypes.array.isRequired,
  listChecked: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  handleOptionsChange: PropTypes.func.isRequired
};

Options.propTypes = {
  options: PropTypes.object.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
};

export { Options };
