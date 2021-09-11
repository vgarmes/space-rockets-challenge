import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FavoritesProvider } from '../../context/favorites_context';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Navbar } from '../';

// baseElement has to be snapshotted because the drawer is a modal that renders outside Navbar fragment
test('drawer is closed by default', () => {
  const { baseElement } = render(
    <Router>
      <FavoritesProvider>
        <ThemeProvider>
          <CSSReset />
          <Navbar />
        </ThemeProvider>
      </FavoritesProvider>
    </Router>
  );

  expect(baseElement).toMatchSnapshot();
});

test('drawer slides in on menu click', () => {
  const { getByRole, baseElement } = render(
    <Router>
      <FavoritesProvider>
        <ThemeProvider>
          <CSSReset />
          <Navbar />
        </ThemeProvider>
      </FavoritesProvider>
    </Router>
  );

  fireEvent.click(getByRole('button', { name: /menu/i }));

  expect(baseElement).toMatchSnapshot();
});
