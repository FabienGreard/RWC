import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { store } from '../../helpers';
import { Dashboard } from './';

describe('Dashboard', () => {
  const code = "const message = 'it's working!';";
  it('renders Dashboard without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  });
  it('code has been changed', () => {
    const event = { target: { name: 'code', value: code } };
    const wrapper = mount(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    wrapper.find('.code').simulate('change', event);
  });
  it('options has changed', () => {
    const event = {
      target: { name: 'transform-object-assign', checked: false }
    };
    const wrapper = mount(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    wrapper.find({ name: 'latest' }).simulate('change', event);
  });
});
