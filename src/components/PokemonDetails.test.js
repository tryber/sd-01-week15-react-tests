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
  // const { debug } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${currentPokemon.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);

  // console.log(debug())

  // Task 11
  // test(`should have an average weight when render ${element.name}`, () => {
  //   pokemonsMock.forEach((currentPokemon) => {
  //     const { getByText } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${currentPokemon.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);

  //     expect(getByText(`Average weight: ${pokemonsMock[0].averageWeight.value} ${pokemonsMock[0].averageWeight.measurementUnit}`)).toBeInTheDocument();
  //   });

  // })
  // // Task 11

  test('hould have a pokemon image', () => {
    // pokemonsMock.forEach((currentPokemon) => {
    // const { debug, queryAllByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${currentPokemon.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
    // const achor = queryAllByRole('heading').map(HTML => HTML.innerHTML);
    // const pageImages = queryAllByRole('img').map(HTML => HTML.src);
    // // pageImages[achor[]]

    // // console.log(achor.find(textCountent => textCountent === ))

    // // console.log(debug())
    // // console.log(pageImages)

    // // expect(queryAllByRole('img')[0]).toBeInTheDocument();
    // // expect(queryAllByRole('img')[0].src).toBe(pokemonsMock[0].image);
    // // expect(queryAllByRole('img')[0].alt).toBe(pokemonsMock[0].name + ' sprite');

    // cleanup();
    // });
  });
  // // Task 12
  // test(`link must not to be avaible when render ${element.name}`, () => {
  //   pokemonsMock.forEach((currentPokemon) => {
  //     const { queryByText } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${currentPokemon.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);

  //     expect(queryByText(/More details/i)).toBeNull();

  //     cleanup();
  //   });
  // });
  // Task 13
  // test('should have a summary', () => {
  //   pokemonsMock.forEach((currentPokemon) => {
  //     const { getByText, queryAllByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${currentPokemon.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
  //     const array = queryAllByRole('heading').map(HTML => HTML.innerHTML);

  //     expect(getByText(currentPokemon.summary)).toBeInTheDocument();

  //     cleanup();

  //     expect(array.includes(' Summary ')).toBeTruthy();
  //   });
  // });




  // Task 14

})

