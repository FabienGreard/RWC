import React from 'react';
import { shallow, mount } from 'enzyme';

import { Dashboard } from './';

describe('CodeEditor', () => {
  const code = "const message = 'it's working!';";
  it('renders Dashboard without crashing', () => {
    shallow(<Dashboard title={'title'} />);
  });
  it('code has been changed', () => {
    const event = { target: { name: 'code', value: code } };
    const wrapper = mount(<Dashboard />);
    wrapper.find('.code').simulate('change', event);
  });
  it('options has changed', () => {
    const event = {
      target: { name: 'transform-object-assign', checked: false }
    };
    const wrapper = mount(<Dashboard />);
    wrapper.find({ name: 'latest' }).simulate('change', event);
  });
});
