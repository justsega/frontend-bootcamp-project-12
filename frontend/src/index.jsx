import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import i18n from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initReactI18next } from 'react-i18next';
import resources from './locales/index';
import App from './components/App';
import store from './slices/index';
import { AuthProvider } from './providers/AuthProvider';
import { SocketProvider } from './providers/SocketProvider';

const rollbarConfig = {
  accessToken: 'c4397654be35404586d5b02225fffd87',
  environment: 'testenv',
};

i18n.use(initReactI18next).init({
  debug: true,
  lng: 'ru',
  resources,
});

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AuthProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>,
);
