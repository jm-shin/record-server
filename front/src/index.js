import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './store';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

import storeReset from 'utils/storeReset';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer, composeWithDevTools());
const persistor = persistStore(store);

storeReset.clear(); // 새로 들어오는 사람마다 모든 로컬과 세션을 초기화

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);