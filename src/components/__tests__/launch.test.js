import React from 'react';
import renderer from 'react-test-renderer';
import { LaunchCard, LaunchListItem } from '../';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { FavoritesProvider } from '../../context/favorites_context';
import { BrowserRouter as Router } from 'react-router-dom';
import { launch } from '../../constants/test-data';

it('launch card renders correctly', () => {
  const cardTree = renderer
    .create(
      <Router>
        <FavoritesProvider>
          <ThemeProvider>
            <CSSReset />
            <LaunchCard launch={launch} />
          </ThemeProvider>
        </FavoritesProvider>
      </Router>
    )
    .toJSON();
  expect(cardTree).toMatchSnapshot();
});

it('launch list item renders correctly', () => {
  const cardTree = renderer
    .create(
      <Router>
        <FavoritesProvider>
          <ThemeProvider>
            <CSSReset />
            <LaunchListItem launch={launch} />
          </ThemeProvider>
        </FavoritesProvider>
      </Router>
    )
    .toJSON();
  expect(cardTree).toMatchSnapshot();
});
