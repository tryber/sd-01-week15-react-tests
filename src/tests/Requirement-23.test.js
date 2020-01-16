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

// essa função quebra maior galho.

// Tava pensando em colocar essas funções que usamos muito em um novo arquivo... deixa para depois.

test('23 - Entrar em uma URL desconhecida exibe a página Not Found', () => {
  const { getByText, getByAltText } = renderWithRouter(<NotFound />, { route: '/dougfunny' });
  expect(getByText('Page requested not found')).toBeInTheDocument();
  expect(getByText('Page requested not found').tagName).toBe('H2');
  const imgError = getByAltText('Pikachu crying because the page requested was not found');
  expect(imgError).toBeInTheDocument();
});
