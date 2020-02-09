import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Exigência → 18', () => {
  test(`Ao clicar no link "Home" na barra de navegação, a aplicação
   deve ser redirecionada para a página inicial, na URL "/"`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const btnHome = getByText(/Home/i);
    const home = btnHome.href;
    fireEvent.click(btnHome);
    expect(`http://localhost${history.location.pathname}`).toBe(home);
  });
});
