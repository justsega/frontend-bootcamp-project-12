import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import resources from './locales/index';
import App from './components/App';
import store from './slices/index';
import { AuthProvider } from './providers/AuthProvider';
import { SocketProvider } from './providers/SocketProvider';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_KEY,
  environment: process.env.ROLLBAR_ENV,
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
              <ToastContainer />
            </SocketProvider>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>,
);
