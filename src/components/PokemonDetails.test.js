import React from 'react';
import { render, cleanup, fireEvent, getAllByText, getByText, waitForDomChange } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import Pokedex from './Pokedex';
import PokemonDetails from './PokemonDetails';
import App from '../App';
import MockTest, { pokemonsMock, isPokemonFavoriteByIdMock } from '../MockTests/MockTest';
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

// Task 10
describe('Details page', () => {
  test('when clicked the link must direct to page details', () => {
    const { history, getByRole } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />)

    expect(getByRole('link')).toBeInTheDocument();

    expect(history.location.pathname).toBe('/');

    fireEvent.click(getByRole('link'));

    expect(history.location.pathname).toBe(`/pokemons/${pokemonsMock[0].id}`);
  });
})

const matchMock = jest.fn((id) => {
  return { 'params': { id } };
});

const onUpdateFavoritePokemonsMock = jest.fn();

// Task 11
test('details page content', () => {
  pokemonsMock.forEach((element) => {
    const { getByText, queryAllByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${element.id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);

    expect(getByText(`Average weight: ${pokemonsMock[0].averageWeight.value} ${pokemonsMock[0].averageWeight.measurementUnit}`)).toBeInTheDocument();
    expect(queryAllByRole('img')[0]).toBeInTheDocument();
    expect(queryAllByRole('img')[0].src).toBe(pokemonsMock[0].image);
    expect(queryAllByRole('img')[0].alt).toBe(pokemonsMock[0].name + ' sprite');
  })

})

// test('details page content', () => {
//   const { getByText, getByRole } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />)

//   fireEvent.click(getByRole('link'));

//   expect(getByText(`Average weight: ${pokemonsMock[0].averageWeight.value} ${pokemonsMock[0].averageWeight.measurementUnit}`)).toBeInTheDocument();
//   expect(getByRole('img')).toBeInTheDocument();
//   expect(getByRole('img').src).toBe(pokemonsMock[0].image);
//   expect(getByRole('img').alt).toBe(pokemonsMock[0].name + ' sprite');
// });

// test('details page must not contain a link', () => {
//   const { debug, getByRole } = renderWithRouter(<App />, { route: `/pokemons/${pokemonsMock[0].id}`})

//   console.log(debug());


// })