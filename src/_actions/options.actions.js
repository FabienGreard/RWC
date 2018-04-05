import { optionsConstants } from '../_constants';

export const optionsActions = {
  receive,
  update
};

function receive() {
  return { type: optionsConstants.RECEIVE };
}

function update(option) {
  return { type: optionsConstants.UPDATE, option };
}
