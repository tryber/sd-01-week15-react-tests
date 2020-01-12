import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokedex from './Pokedex';
import MockTest, { pokemonsMock, isPokemonFavoriteByIdMock } from '../MockTests/MockTest';

afterEach(cleanup);

const pokeName = pokemonsMock.map((pokemon => pokemon.name));

test('expect the Pokédex only shows one pokémon at the time', () => {
  const { queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
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
      <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
    </MemoryRouter>
  );

  expect(getByText(/Próximo pokémon/i)).toHaveTextContent('Próximo pokémon');
});

test('when button is clicked must display the others pokémons', () => {
  const { getByText, queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
    </MemoryRouter>
  );

  pokeName.forEach((pokemon, index) => {
    pokemon === pokeName[index] ? expect(queryAllByText(pokemon).length).toBe(1)
      : expect(queryAllByText(pokemon).length).toBe(0);

    fireEvent.click(getByText(/Próximo pokémon/i));
  });
});

test('after gets in the last pokémon, when click the button again must show the first pokémon', () => {
  const { getByText, queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
    </MemoryRouter>
  );

  pokeName.forEach(() => {
    fireEvent.click(getByText(/Próximo pokémon/i));
  });

  pokeName.forEach(pokemon => {
    pokemon === pokeName[0] ? expect(queryAllByText(pokemon).length).toBe(1)
      : expect(queryAllByText(pokemon).length).toBe(0);
  });
});
