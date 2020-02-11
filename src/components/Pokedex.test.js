import React from 'react';
import { render, cleanup, fireEvent, getByRole } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import Pokedex from './Pokedex';
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

// const { debug } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);
// console.log(debug())

describe('Pokedex', () => {
  describe('Pokemon Display', () => {
    // Task 02
    test('should shows only one pokémon at the time', () => {
      const { container } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);
      const pHTMLall = Object.keys(container.querySelectorAll('p')).map(key => container.querySelectorAll('p')[key]);
      const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);
      const displayedContent = [];
      const displayedContentNot = [];

      pokemonsMock.forEach(({ name }) => {
        pContainer.includes(name) ? displayedContent.push(name)
          : displayedContentNot.push(name);

      });

      expect(displayedContent.length).toBe(1);
      expect(displayedContentNot.length).toBe(pokemonsMock.length - 1);
    })
    // Task 08-01
    test('should have an average weight', () => {
      const { getByText } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);

      for (let crossnFn = 0; crossnFn <= pokemonsMock.length; crossnFn += 1) {
        if (crossnFn === pokemonsMock.length) {
          expect(getByText(`Average weight: ${pokemonsMock[0].averageWeight.value} ${pokemonsMock[0].averageWeight.measurementUnit}`)).toBeInTheDocument();
        } else {
          expect(getByText(`Average weight: ${pokemonsMock[crossnFn].averageWeight.value} ${pokemonsMock[crossnFn].averageWeight.measurementUnit}`)).toBeInTheDocument();
        };

        fireEvent.click(getByText(/Próximo pokémon/i));
      };
    });

    // Task 08-02
    test('should have a image', () => {
      const { getByText, getAllByRole } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);

      for (let crossnFn = 0; crossnFn <= pokemonsMock.length; crossnFn += 1) {

        if (crossnFn === pokemonsMock.length) {
          const pokemonImage = getAllByRole('img').find(imgHTML => imgHTML.src === pokemonsMock[0].image);

          expect(pokemonImage).toBeInTheDocument();
          expect(pokemonImage.src).toBe(pokemonsMock[0].image);
          expect(pokemonImage.alt).toBe(pokemonsMock[0].name + ' sprite');
        } else {
          const pokemonImage = getAllByRole('img').find(imgHTML => imgHTML.src === pokemonsMock[crossnFn].image);

          expect(pokemonImage).toBeInTheDocument();
          expect(pokemonImage.src).toBe(pokemonsMock[crossnFn].image);
          expect(pokemonImage.alt).toBe(pokemonsMock[crossnFn].name + ' sprite');
        };

        fireEvent.click(getByText(/Próximo pokémon/i));
      };
    });

    // Task 09
    test('should have a link to details', () => {
      const { getByText, getByRole } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);

      for (let crossnFn = 0; crossnFn <= pokemonsMock.length; crossnFn += 1) {

        if (crossnFn === pokemonsMock.length) {
          expect(getByRole('link')).toBeInTheDocument();
          expect(getByRole('link')).toHaveTextContent(/More Details/i);
          expect(getByRole('link').href).toBe(`http://localhost/pokemons/${pokemonsMock[0].id}`);
        } else {
          expect(getByRole('link')).toBeInTheDocument();
          expect(getByRole('link')).toHaveTextContent(/More Details/i);
          expect(getByRole('link').href).toBe(`http://localhost/pokemons/${pokemonsMock[crossnFn].id}`);
        };

        fireEvent.click(getByText(/Próximo pokémon/i));
      };
    });

    // Task 10
    test('when clicked, the link must direct to page details', () => {




      for (let crossnFn = 0; crossnFn <= pokemonsMock.length; crossnFn += 1) {
        const { history, getByText, getByRole } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);
        
        expect(history.location.pathname).toBe('/');
        
        for (let pressButton = 0; pressButton < crossnFn; pressButton += 1) {
          fireEvent.click(getByText(/Próximo pokémon/i));
        };
        
        if (crossnFn === pokemonsMock.length) {
          fireEvent.click(getByRole('link'));
          expect(history.location.pathname).toBe(`/pokemons/${pokemonsMock[0].id}`);

        } else {
          fireEvent.click(getByRole('link'));
          expect(history.location.pathname).toBe(`/pokemons/${pokemonsMock[crossnFn].id}`);
        };
        
        cleanup();
      };
    });
  })

  describe('Next Pokémon Button', () => {
    // Task 03-01
    test('label must be "Próximo pokémon"', () => {
      const { getByText } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);

      expect(getByText(/Próximo pokémon/i)).toHaveTextContent('Próximo pokémon');
    });
    // Task 03-02 03-03
    test('when clicked, must display the others pokémons and after gets in the last pokémon, when clicked again, must show the first pokémon', () => {
      const { getByText, container } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);

      for (let crossnFn = 0; crossnFn <= pokemonsMock.length; crossnFn += 1) {
        const pHTMLall = Object.keys(container.querySelectorAll('p')).map(key => container.querySelectorAll('p')[key]);
        const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);

        if (crossnFn === pokemonsMock.length) {
          expect(pContainer.includes(pokemonsMock[0].name)).toBeTruthy();
        } else {
          expect(pContainer.includes(pokemonsMock[crossnFn].name)).toBeTruthy();

          fireEvent.click(getByText(/Próximo pokémon/i));
        };
      };
    });

    // Task 07
    test('when the list have one pokémon the button must be disable', () => {
      const { queryAllByText, getAllByRole, getByText } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);
      const justOnePokémonOfTheType = pokeTypeFilter.filter(type => {
        const typePokemons = pokemonsMock.filter(pokemon => pokemon.type === type).map(pokemon => pokemon.name);
        if (typePokemons.length === 1) return true;
        return false;
      });
      const typeButton = queryAllByText(justOnePokémonOfTheType[0])
        .find(elm => {
          if (getAllByRole('button').find(button => button === elm) !== undefined) {
            return true;
          } return false;
        });
      expect(getByText(/Próximo pokémon/i).disabled).toBeFalsy();

      fireEvent.click(typeButton);

      expect(getByText(/Próximo pokémon/i).disabled).toBeTruthy();
    });
  })

  describe('Filter Type Button', () => {
    // Task 04-01 04-02
    test('when clicked only pokémons that type must appear', () => {
      const { getByText, queryAllByRole, container } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);
      const arrayButtonDataBased = [];

      pokemonsMock.forEach(({ type }) => {
        arrayButtonDataBased.push(queryAllByRole('button').find(button => button.innerHTML === type));
      });

      const typeButton = arrayButtonDataBased.filter((HTML, index) => arrayButtonDataBased.indexOf(HTML) === index);

      typeButton.forEach((buttonHTML, index) => {
        fireEvent.click(buttonHTML);

        const typePokemons = pokemonsMock.filter((pokemon) => pokemon.type === buttonHTML.innerHTML).map(({ name }) => name);
        // 04-02 e 06
        expect(buttonHTML.innerHTML).toBe(pokeTypeFilter[index]);

        for (let crossnFn = 0; crossnFn <= typePokemons.length; crossnFn += 1) {
          const pHTMLall = Object.keys(container.querySelectorAll('p')).map(key => container.querySelectorAll('p')[key]);
          const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);

          fireEvent.click(getByText(/Próximo pokémon/i));

          // 04-01
          if (crossnFn === typePokemons.length) {
            expect(pContainer.includes(typePokemons[0])).toBeTruthy();
          } else {
            expect(pContainer.includes(typePokemons[crossnFn])).toBeTruthy();
          };
        };
      });
    })
  })



  describe('Type All Button', () => {
    // Task 05-01 05-03
    test('the label must be "all"', () => {
      const { getByText } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);
      expect(getByText(/all/i)).toHaveTextContent(/all/i);
    });
    // Task 05 - 02
    test('when clicked must show all pokémons', () => {
      const { getByText, container } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />);

      fireEvent.click(getByText(/all/i));

      for (let crossnFn = 0; crossnFn <= pokemonsMock.length; crossnFn += 1) {
        const pHTMLall = Object.keys(container.querySelectorAll('p')).map(key => container.querySelectorAll('p')[key]);
        const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);

        fireEvent.click(getByText(/Próximo pokémon/i));

        if (crossnFn === pokemonsMock.length) {
          expect(pContainer.includes(pokeName[0])).toBeTruthy();
        } else {
          expect(pContainer.includes(pokeName[crossnFn])).toBeTruthy();
        };
      };
    });
  })



})





//   //   });

//   //   // Task 10
//   //   test('', () => {
//   //     const { debug, container, history, getByRole } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />)

//   //     expect(getByRole('link')).toBeInTheDocument();

//   //     // console.log(getByRole('link'));










//   //   });
//   // })







