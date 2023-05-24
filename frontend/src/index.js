import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'c4397654be35404586d5b02225fffd87',
  environment: 'testenv',
};

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
);

