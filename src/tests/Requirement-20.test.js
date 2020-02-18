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
  test(`Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação
   deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const btnFavorite = getByText(/Favorite Pokémons/i);
    const favorite = btnFavorite.href;
    fireEvent.click(btnFavorite);
    expect(`http://localhost${history.location.pathname}`).toBe(favorite);
  });
});
