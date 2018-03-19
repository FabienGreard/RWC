import React from 'react';
import { shallow } from 'enzyme';

import { CodeEditor } from './CodeEditor';

describe('CodeEditor', () => {
  const code = "const message= 'it's working!';";
  const options = {
    plugins: [""],
    presets: [""]
  }
  it('renders CodeEditor without crashing', () => {
    shallow(<CodeEditor code={code} handleChange={() => {}} options={options}/>);
  });
});
