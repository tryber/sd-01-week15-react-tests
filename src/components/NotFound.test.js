import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NotFound from './NotFound';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('23 - Entrar em uma URL desconhecida exibe a página Not Found', () => {
  const { getByText, getByAltText } = renderWithRouter(
    <NotFound />, { route: '/xablau' }
  );
  expect(getByText('Page requested not found')).toBeInTheDocument();
  expect(getByText('Page requested not found').tagName).toBe('H2');
  const imgError = getByAltText('Pikachu crying because the page requested was not found');
  expect(imgError).toBeInTheDocument();
  expect(imgError.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
