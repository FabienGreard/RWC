import React from 'react';
import { shallow, mount } from 'enzyme';

import { Evaluate } from './Evaluate';

describe('Evaluate', () => {
  const code = "const message = 'its working!';";
  const el = document.createElement('iframe');
  Object.defineProperty(el, 'contentWindow', {
    value: document.body.appendChild(el).contentWindow
  });

  it('renders Evaluate without crashing', () => {
    shallow(<Evaluate code={code} el={el} />);
  });
  it('options has been checked', () => {
    let event = { target: { name: 'isEvaluate', checked: true } };
    const wrapper = mount(<Evaluate code={code} el={el} />);

    wrapper.find({ name: 'isEvaluate' }).simulate('change', event);
    wrapper.find({ name: 'isEvaluate' }).simulate('change', event);
  });
  it('script already exist', () => {
    let event = { target: { name: 'isEvaluate', checked: true } };
    const wrapper = mount(<Evaluate code={code} el={el} />);

    wrapper.find({ name: 'isEvaluate' }).simulate('change', event);
    wrapper.setProps({ code: '/* NOTHING */;' });
  });
  it('code has errors', () => {
    el.contentWindow.dispatchEvent(new Event('error'));
  });
});
