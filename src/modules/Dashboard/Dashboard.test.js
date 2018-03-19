import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import { Dashboard } from './';


describe('CodeEditor', () => {
  const code = "const message = 'hello'";
  it('renders Dashboard without crashing', () => {
    shallow(<Dashboard title={"title"}/>);
  });
  it('Code has been enter', () => {
    const wrapper = shallow(<Dashboard title={"title"}/>);
    const codeEditor = wrapper.find('CodeEditor');
    console.log(codeEditor)
  });
});
