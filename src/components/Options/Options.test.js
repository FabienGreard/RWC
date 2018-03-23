import React from 'react';
import { shallow, mount } from 'enzyme';

import { Options } from './Options';

describe('Options', () => {
  let options = { presets: [''], plugins: [''] };
  let handleOptionsChange = () => {};

  it('renders Options without crashing', () => {
    shallow(
      <Options options={options} handleOptionsChange={handleOptionsChange} />
    );
  });
  it('Options has changed', () => {
    const wrapper = shallow(
      <Options options={options} handleOptionsChange={handleOptionsChange} />
    );
    options = { presets: ['latest', 'env'], plugins: [''] };
    wrapper.setProps({ options, handleOptionsChange }); //true
    wrapper.setProps({ options, handleOptionsChange }); //false
  });
  it('options has been checked', () => {
    options = { presets: ['latest'] };
    const event = {
      target: { name: 'transform-object-assign', checked: false }
    };
    const wrapper = mount(
      <Options options={options} handleOptionsChange={handleOptionsChange} />
    );
    wrapper.find({ name: 'latest' }).simulate('change', event);
  });
});
