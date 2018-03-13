import React from 'react';
import { shallow } from 'enzyme';

import { Dashboard } from './';

it('renders Dashboard without crashing', () => {
  shallow(<Dashboard title={"title"}/>);
});
