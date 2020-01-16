import React from 'react';
import { render, cleanup, fireEvent, getByRole, getAllByText } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import FavoritePokemons from './FavoritePokemons';
import MockTest, { pokemonsMock, isPokemonFavoriteByIdMock } from '../MockTests/MockTest';

afterEach(cleanup);

const pokeName = pokemonsMock.map(pokemon => pokemon.name);
const pokeTypes = pokemonsMock.map(pokemon => pokemon.type);
const pokeTypeFilter = pokeTypes.filter((pokemon, index) => pokeTypes.indexOf(pokemon) === index);

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

describe('Favorite Pokemons', () => {
  // 22-01 22-02
  test('should display all favorites pokemons', () => {
    const favoritePokemonsData = pokemonsMock.filter(({ id }) => isPokemonFavoriteByIdMock[id]);
    const { container } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemonsData} />);
    const pHTMLall = Object.keys(container.querySelectorAll('p')).map(key => container.querySelectorAll('p')[key]);
    const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);
    const favoritePokemonsName = favoritePokemonsData.map(({ name }) => name);
    pokeName.forEach(({ name }) => {
      if (favoritePokemonsName.includes(name)) {
        // 21-01
        expect(pContainer.includes(name)).toBeTruthy();
        // 21-02
      } else {
        expect(pContainer.includes(name)).toBeFalsy();
      };
    });
  });
})
