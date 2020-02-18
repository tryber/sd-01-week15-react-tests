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

describe('Exigência → 19', () => {
  test(`Ao clicar no link "About" na barra de navegação, a aplicação
   deve ser redirecionada para a página de About, na URL "/about"`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const btnAbout = getByText(/About/i);
    const about = btnAbout.href;
    fireEvent.click(btnAbout);
    expect(`http://localhost${history.location.pathname}`).toBe(about);
  });
});
