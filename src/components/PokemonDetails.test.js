import React from 'react';
import { render, cleanup, fireEvent, getAllByText, getByText, waitForDomChange } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import PokemonDetails from './PokemonDetails';
import MockTest, { pokemonsMock, isPokemonFavoriteByIdMock, matchMock, onUpdateFavoritePokemonsMock } from '../MockTests/MockTest';
import { element } from 'prop-types';

afterEach(cleanup);

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => (<div> {children} </div>),
  }
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Details Page', () => {
  // Task 11
  test('should have an average weight', () => {
    pokemonsMock.forEach((element) => {
      const { getByText } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${element.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);

      expect(getByText(`Average weight: ${pokemonsMock[0].averageWeight.value} ${pokemonsMock[0].averageWeight.measurementUnit}`)).toBeInTheDocument();
    });
  });
  // Task 11
  test('should have a pokemon image', () => {
    pokemonsMock.forEach((element) => {
      const { queryAllByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${element.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);

      expect(queryAllByRole('img')[0]).toBeInTheDocument();
      expect(queryAllByRole('img')[0].src).toBe(pokemonsMock[0].image);
      expect(queryAllByRole('img')[0].alt).toBe(pokemonsMock[0].name + ' sprite');
    });
  });
  // Task 12
  test('link must not to be avaible', () => {
    pokemonsMock.forEach((element) => {
      const { queryByText } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${element.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);

      expect(queryByText(/More details/i)).toBeNull();
    });
  });
  // Task 13
  pokemonsMock.forEach((element) => {
    test(`should have a summary for ${element.name}`, () => {
      const { queryByText, queryAllByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${element.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
      const array = queryAllByRole('heading').map(HTML => HTML.innerHTML);

      expect(array.includes(' Summary ')).toBeTruthy();
      expect(queryByText(element.summary)).toBeInTheDocument();
    });
  });
})

