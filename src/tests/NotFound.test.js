import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NotFound from '../components/NotFound';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('23 Show error', () => {
  test('23.1 The page shows error 404', () => {
    const { getByText } = renderWithRouter(<NotFound />, { route: '/coruja' });

    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
    expect(getByText(/Page requested not found/i).tagName).toBe('H2');
  });

  test('23.2 The page must containing a image about Pokedex', () => {
    const { getByAltText } = renderWithRouter(<NotFound />, { route: '/coruja' });

    const imagePageAbout = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imagePageAbout).toBeInTheDocument();
    expect(imagePageAbout.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
