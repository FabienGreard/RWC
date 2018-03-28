import React from 'react';
import { shallow, mount } from 'enzyme';

import { Options } from './Options';

describe('Options', () => {
  let options = { presets: [''], plugins: [''] };
  let handleChange = () => {};

  it('renders Options without crashing', () => {
    shallow(<Options options={options} handleChange={handleChange} />);
  });
  it('Options has changed', () => {
    const wrapper = shallow(
      <Options options={options} handleChange={handleChange} />
    );
    options = { presets: ['latest', 'env'], plugins: [''] };
    wrapper.setProps({ options, handleChange }); //true
    wrapper.setProps({ options, handleChange }); //false
  });
  it('options has been checked', () => {
    options = { presets: ['latest'] };
    const event = {
      target: { name: 'transform-object-assign', checked: false }
    };
    const wrapper = mount(
      <Options options={options} handleChange={handleChange} />
    );
    wrapper.find({ name: 'latest' }).simulate('change', event);
  });
});
