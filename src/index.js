import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux';
import { Provider } from 'react-redux';
import './styles/index.css';
import ModeProvider from './utils/mode';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModeProvider>
      <Provider store={store}>
            <App/>
      </Provider>
    </ModeProvider>
  </React.StrictMode>
);