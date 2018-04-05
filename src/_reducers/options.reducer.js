import { optionsConstants } from '../_constants';
import { optionsMock } from '../helpers';

export const options = (state = {}, action) => {
  switch (action.type) {
    case optionsConstants.RECEIVE:
      return {
        items: optionsMock
      };
    case optionsConstants.UPDATE:
      return {
        items: action.option
      };
    default:
      return state;
  }
};
