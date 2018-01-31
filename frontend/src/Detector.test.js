import React from 'react';
import ReactDOM from 'react-dom';
import Detector from './Detector';
import config from './config'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Detector apiUrl={config.API_URL}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
