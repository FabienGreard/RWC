import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import { store } from '../../helpers';
import { CodeEditor } from './CodeEditor';

describe('CodeEditor', () => {
  const code = "const message = 'its working!';";
  const options = {
    plugins: [''],
    presets: ['']
  };
  it('renders CodeEditor without crashing', () => {
    mount(
      <Provider store={store}>
        <CodeEditor code={code} handleChange={() => {}} options={options} />
      </Provider>
    );
  });
});
