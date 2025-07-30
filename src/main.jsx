// =======================================================================
// FILE: src/main.jsx
// =======================================================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { initializeAuth } from './features/auth/authSlice';
import './styles/global.css';

store.dispatch(initializeAuth());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
