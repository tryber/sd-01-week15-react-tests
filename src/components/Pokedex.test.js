import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokedex from './Pokedex';
import MockTest, { pokemons_mock, isPokemonFavoriteById_mock } from '../MockTests/MockTest';

test('expect the Pokédex only shows one pokémon at the time', () => {
  const { queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons_mock} isPokemonFavoriteById={isPokemonFavoriteById_mock} />
    </MemoryRouter>
  );

  expect(queryAllByText(/Ditto/i).length).toBe(1);
  expect(queryAllByText(/Charmander/i).length).toBe(0);
  expect(queryAllByText(/Jigglypuff/i).length).toBe(0);
});
