import React from 'react';
import { Router } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import { pokemons, isPokemonFavoriteById, isNotPokemonFavoriteById } from './dataMock';

function renderWithRouter(
  ui,
  { route = '/favorites', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('22 Page shows favorites pokemons', () => {
  afterEach(cleanup);

  test('22.1 page shows every favorites pokemons', () => {
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);
    const { getByText, getByAltText } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemons} />,
    );
    favoritePokemons.forEach((favorite) => {
      expect(getByText(favorite.name)).toBeInTheDocument();
      expect(getByText(favorite.type)).toBeInTheDocument();
      expect(getByText(`Average weight: ${favorite.averageWeight.value} ${favorite.averageWeight.measurementUnit}`)).toBeInTheDocument();
      expect(getByAltText(`${favorite.name} sprite`).src).toBe(favorite.image);
    });
  });

  test('22.2 page shows only favorites pokemons', () => {
    const noFavoritePokemons = pokemons.filter(({ id }) => isNotPokemonFavoriteById[id]);
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={noFavoritePokemons} />,
    );
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
