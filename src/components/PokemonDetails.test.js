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

const { debug } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`1`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
console.log(debug())        

describe('Details Page', () => {

  describe('<p> testing <p>', () => {
    // Task 11-01
    test('should have an average weight', () => {
      pokemonsMock.forEach(({ id, averageWeight: { value, measurementUnit } }) => {
        const { container } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
        const pHTMLall = Object.keys(container.querySelectorAll('p')).map(key => container.querySelectorAll('p')[key]);
        const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);

        expect(pContainer.includes(`Average weight: ${value} ${measurementUnit}`)).toBeTruthy();

        cleanup();
      })
    });
    // Task 13-02
    test('should have a brief resume', () => {
      pokemonsMock.forEach(({ id, summary }) => {
        const { container } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
        const pHTMLall = Object.keys(container.querySelectorAll('p')).map(key => container.querySelectorAll('p')[key]);
        const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);

        expect(pContainer.includes(summary)).toBeTruthy();

        cleanup();
      })
    });
    // Task 14-02 14-03
    test('should have all the location(s) name(s)', () => {
      pokemonsMock.forEach(({ id, foundAt }) => {
        const { container } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
        const pHTMLall = Object.keys(container.getElementsByTagName('em')).map(key => container.getElementsByTagName('em')[key]);
        const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);

        foundAt.forEach(object => expect(pContainer.includes(object.location)).toBeTruthy());

        cleanup();
      })
    });
  })

  describe('<img /> testing', () => {
    // Test 11-02
    test('should have a pokemon img', () => {
      pokemonsMock.forEach(({ name, id, image }) => {
        const { queryAllByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
        const imgHTMLsrc = queryAllByRole('img').map(HTML => HTML.src);
        const imgHTMLalt = queryAllByRole('img').map(HTML => HTML.alt);

        expect(imgHTMLalt.includes(`${name} sprite`)).toBeTruthy();
        expect(imgHTMLsrc[imgHTMLalt.indexOf(`${name} sprite`)]).toBe(image);
        

        cleanup();
      });
    });
    // Test 14-03 14-04 14-05
    test('should have all the location(s) images(s)', () => {
      pokemonsMock.forEach(({ name, id, foundAt }) => {
        const { queryAllByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
        const imgHTMLsrc = queryAllByRole('img').reduce((array, HTML) => {
          if(HTML.alt === `${name} location`){
            array.push(HTML.src);
          }
          return array;
        }, []);
        const imgHTMLalt = queryAllByRole('img').map(HTML => HTML.alt);

        expect(imgHTMLalt.includes(`${name} location`)).toBeTruthy();
        foundAt.forEach(object => expect(imgHTMLsrc.includes(object.map)).toBeTruthy());

        cleanup();
      });
    });
  })

  describe('<h?> testing <h?/>', () => {
    // Task 13-01
    test('should have a summary heading', () => {
      pokemonsMock.forEach(({ id }) => {
        const { queryAllByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
        const headingHTMLall = queryAllByRole('heading').map(HTML => HTML.innerHTML);

        expect(headingHTMLall.includes(' Summary ')).toBeTruthy();

        cleanup();
      });
    });
    // Task 14-01
    test('should have a pokemon game location heading', () => {
      pokemonsMock.forEach(({ id, name }) => {
        const { queryAllByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);
        const headingHTMLall = queryAllByRole('heading').map(HTML => HTML.innerHTML);
        
        expect(headingHTMLall.includes(`Game Locations of ${name}`)).toBeTruthy();

        cleanup();
      });
    });
  })

  describe('should not have', () => {
    test('a link to display pokemon page details', () => {
      // Task 12
      pokemonsMock.forEach(({ id }) => {
        const { queryByRole } = renderWithRouter(<PokemonDetails pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} match={matchMock(`${id}`)} onUpdateFavoritePokemons={onUpdateFavoritePokemonsMock} />);

        expect(queryByRole('link')).toBeNull();

        cleanup();
      })
    });
  })

});