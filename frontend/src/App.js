import React from 'react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import Routes from './routes';
import store from './store';
import GlobalStyles from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <Routes />
      <GlobalStyles />
    </Provider>
  );
}

export default App;
