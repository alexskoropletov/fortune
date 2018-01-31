import React from 'react';
import ReactDOM from 'react-dom';
import Shortener from './Shortener';
import config from './config'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

it('renders without crashing', () => {
  const mock = new MockAdapter(axios);
  const data = {
    0:{id: 1, name: 'Foo'},
    1:{id: 2, name: 'Bar'}
  };
  mock.onGet(config.API_URL + 'users').reply(200, data);

  const div = document.createElement('div');
  ReactDOM.render(<Shortener apiUrl={config.API_URL}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
