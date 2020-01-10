import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokedex from './Pokedex';
import MockTest, { pokemons_Mock, isPokemonFavoriteById_Mock } from '../MockTests/MockTest';

test('expect the Pokédex only shows one pokémon at the time', () => {
  const { queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons_Mock} isPokemonFavoriteById={isPokemonFavoriteById_Mock} />
    </MemoryRouter>
  );

  expect(queryAllByText(/Ditto/i).length).toBe(1);
  expect(queryAllByText(/Charmander/i).length).toBe(0);
  expect(queryAllByText(/Jigglypuff/i).length).toBe(0);
});
