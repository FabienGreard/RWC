import { createMockStore } from 'redux-test-utils';
import { optionsActions } from './';

describe('Options', () => {
  it('Options is receive', () => {
    const store = createMockStore({});
    store.dispatch(optionsActions.receive());
    expect(store.getActions()).toEqual([{ type: 'OPTIONS_RECEIVE' }]);
  });
  it('Options is update', () => {
    const store = createMockStore({});
    store.dispatch(optionsActions.update());
    expect(store.getActions()).toEqual([{ type: 'OPTIONS_UPDATE' }]);
  });
});
