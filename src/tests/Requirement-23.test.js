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

test('23 - Entrar em uma URL desconhecida exibe a página Not Found', () => {
  function testNotFoundError(nameError) {
    const { getByText, getByAltText } = renderWithRouter(<NotFound />, { route: `/${nameError}` });
    const found404 = getByText(/Page requested not found/i);
    expect(found404).toBeInTheDocument();
    expect(found404.tagName).toBe('H2');
    const pikachuCry = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(pikachuCry).toBeInTheDocument();
    expect(pikachuCry.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  }
  testNotFoundError('dougfunny');
});
