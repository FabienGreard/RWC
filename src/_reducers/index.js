import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { options } from './options.reducer';

const rootReducer = combineReducers({
  alert,
  options
});

export { rootReducer };
