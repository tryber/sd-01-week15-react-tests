import React from 'react';
import { render, cleanup, fireEvent, getByRole, getAllByText } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import About from './About';
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

describe('About Page', () => {
  // 21-01
  test('should have a heading with the text About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText('About Pokédex')).toBeInTheDocument();
  });
  // 21-02
  test('should have two paragraphs', () => {
    const { container } = renderWithRouter(<About />);
    const pHTMLall = Object.keys(container.querySelectorAll('p')).map(key => container.querySelectorAll('p')[key]);
    const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);
  
    expect(pContainer.length).toEqual(2);
  });
  //21-03
  test('should have a image', () => {
    const { getByRole } = renderWithRouter(<About />);
 
    expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png')
  });
})
