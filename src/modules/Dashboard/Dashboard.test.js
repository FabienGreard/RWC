import React from 'react';
import { shallow, mount } from 'enzyme';

import { Dashboard } from './';

describe('CodeEditor', () => {
  const code = "const message = 'it's working!';";
  it('renders Dashboard without crashing', () => {
    shallow(<Dashboard title={"title"}/>);
  });
  it('Code has been enter', () => {
    const event = {target: {name: 'code', value: code}};
    const dashboard = mount(<Dashboard title={"title"}/>);
    dashboard.find('.code').simulate('change', event);
  });
});
