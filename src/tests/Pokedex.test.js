import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Pokedex from '../components/Pokedex';
import { pokemons, isPokemonFavoriteById, isNotPokemonFavoriteById } from './dataMock';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('10 Page of details', () => {
  afterEach(cleanup);

  test('10.1 The URL must change for pokemon/id details', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const link = getByRole('link');
    expect(link).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');

    fireEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });
});

describe('16 Favorites pokemons must have a star', () => {
  afterEach(cleanup);

  test('16.1 show the attribute src', () => {
    const { getByText, getByAltText, queryByAltText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    const nextPokemon = getByText(/Próximo pokémon/i);
    pokemons.forEach((favoriteStar) => {
      if (isPokemonFavoriteById[favoriteStar.id]) {
        const imageStar = getByAltText(`${favoriteStar.name} is marked as favorite`);
        expect(imageStar).toBeInTheDocument();
        expect(imageStar.src).toBe('http://localhost/star-icon.svg');
      } else {
        expect(queryByAltText(`${favoriteStar.name} is marked as favorite`)).not.toBeInTheDocument();
      }
      fireEvent.click(nextPokemon);
    });
  });
});

