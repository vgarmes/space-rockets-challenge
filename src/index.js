import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { FavoritesProvider } from './context/favorites_context';
import { LaunchesProvider } from './context/launches_context';
import './styles/main.css';

import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FavoritesProvider>
        <LaunchesProvider>
          <ThemeProvider>
            <CSSReset />
            <App />
          </ThemeProvider>
        </LaunchesProvider>
      </FavoritesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
