import React from 'react';
import { shallow, mount } from 'enzyme';

import { Prettier } from './Prettier';

describe('Prettier', () => {
  const code = "const message = 'its working!';";
  it('renders Prettier without crashing', () => {
    shallow(<Prettier code={code} />);
  });
  it('options has been checked', () => {
    let event = { target: { name: 'isPrettier', checked: true } };
    const wrapper = mount(<Prettier code={code} />);

    wrapper.find({ name: 'isPrettier' }).simulate('change', event);
    wrapper.find({ name: 'isPrettier' }).simulate('change', event);
  });
  it('code has change', () => {
    let event = { target: { name: 'isPrettier', checked: true } };
    const wrapper = mount(<Prettier code={code} />);

    wrapper.find({ name: 'isPrettier' }).simulate('change', event);
    wrapper.setProps({ code: '/* NOTHING */;' });
  });
});
