import React from 'react';
import { shallow, mount } from 'enzyme';

import { Prettier } from './Prettier';

describe('Prettier', () => {
  const code = "const message = 'its working!';";
  it('renders Prettier without crashing', () => {
    shallow(<Prettier code={code} handleChange={() => {}} />);
  });
  it('Prettier onClick', () => {
    const wrapper = mount(<Prettier code={code} handleChange={() => {}} />);

    wrapper.find({ name: 'isPrettier' }).simulate('click');
  });
});
