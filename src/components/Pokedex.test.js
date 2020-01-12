import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokedex from './Pokedex';
import MockTest, { pokemons_Mock, isPokemonFavoriteById_Mock } from '../MockTests/MockTest';



const pokeName = pokemons_Mock.map((pokemon => pokemon.name));

test('expect the Pokédex only shows one pokémon at the time', () => {
  const { queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons_Mock} isPokemonFavoriteById={isPokemonFavoriteById_Mock} />
    </MemoryRouter>
  );

  pokeName.forEach(pokemon => {
    pokemon === pokeName[0] ? expect(queryAllByText(pokemon).length).toBe(1)
      : expect(queryAllByText(pokemon).length).toBe(0);
  });
});

test('button label must be "Próximo pokémon"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons_Mock} isPokemonFavoriteById={isPokemonFavoriteById_Mock} />
    </MemoryRouter>
  );

  expect(getByText(/Próximo pokémon/i)).toHaveTextContent('Próximo pokémon');
});
