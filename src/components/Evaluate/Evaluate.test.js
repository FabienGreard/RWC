import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { store } from '../../helpers';
import { Evaluate } from './Evaluate';

describe('Evaluate', () => {
  const code = "const message = 'its working!';";
  const el = document.createElement('iframe');
  Object.defineProperty(el, 'contentWindow', {
    value: document.body.appendChild(el).contentWindow
  });

  it('renders Evaluate without crashing', () => {
    mount(
      <Provider store={store}>
        <Evaluate code={code} el={el} />
      </Provider>
    );
  });
  it('Evaluate has been checked', () => {
    let event = { target: { name: 'isEvaluate', checked: false } };
    const wrapper = shallow(
      <Provider store={store}>
        <Evaluate code={code} el={el} />
      </Provider>
    );

    const component = wrapper.dive({ context: { store } }).dive();

    component.find({ name: 'isEvaluate' }).simulate('change', event);
    event = { target: { name: 'isEvaluate', checked: true } };
    component.find({ name: 'isEvaluate' }).simulate('change', event);
    component.setProps({ code: '/* nothing */' });
    component.setProps({ code: '/* nothing */' });
  });
  it('script already exist', () => {
    let event = { target: { name: 'isEvaluate', checked: true } };

    const wrapper = mount(
      <Provider store={store}>
        <Evaluate code={code} el={el} />
      </Provider>
    );

    wrapper.find({ name: 'isEvaluate' }).simulate('change', event);
  });
  it('code has errors', () => {
    el.contentWindow.dispatchEvent(new Event('error'));
  });
});
