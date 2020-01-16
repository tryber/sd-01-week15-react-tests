import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Exigência → 19', () => {
  test(`Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação
   deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"`, () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('Favorite Pokémons'));
    const favoritePokemon = getByText('No favorite pokemon found');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
