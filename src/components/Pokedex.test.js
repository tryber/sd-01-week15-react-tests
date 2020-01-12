import React from 'react';
import { render, cleanup, fireEvent, getAllByText, getByText, waitForDomChange } from '@testing-library/react';
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


describe('Pokédex pokémon check', () => {
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
})

describe('Pokédex button "Próximo pokémon"', () => {
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
})

describe('Pokédex filter type buttons', () => {
  test('when click a filter type button only pokémons that type must appear', () => {
    const { getByText, getAllByRole, queryAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
      </MemoryRouter>
    );

    pokeTypeFilter.forEach(type => {
      const typeButton = queryAllByText(type)
        .find(elm => {
          if (getAllByRole('button').find(button => button === elm) !== undefined) {
            return true
          } return false
        });

      fireEvent.click(typeButton);

      const typePokemons = pokemonsMock.filter(pokemon => pokemon.type === type).map(pokemon => pokemon.name);
      typePokemons.forEach((pokemon, index) => {
        pokemon === typePokemons[index] ? expect(queryAllByText(pokemon).length).toBe(1)
          : expect(queryAllByText(pokemon).length).toBe(0);

        fireEvent.click(getByText(/Próximo pokémon/i));
      });
    });
  });

  test('must have all the type buttons and label must be the type name', () => {
    const { getAllByRole, queryAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
      </MemoryRouter>
    );

    pokeTypeFilter.forEach(type => {
      const typeButton = queryAllByText(type)
        .find(elm => {
          if (getAllByRole('button').find(button => button === elm) !== undefined) {
            return true
          } return false
        });

      expect(typeButton).toHaveTextContent(type);
    });
  });

  describe('Type all button', () => {
    test('must have the all button with the label "all"', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}>
          <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
        </MemoryRouter>
      );

      expect(getByText(/all/i)).toHaveTextContent(/all/i);
    });

    test('when clicked, must show all pokémons', () => {
      const { getByText, queryAllByText } = render(
        <MemoryRouter initialEntries={['/']}>
          <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
        </MemoryRouter>
      );

      fireEvent.click(getByText(/all/i));

      pokeName.forEach((pokemon, index) => {
        pokemon === pokeName[index] ? expect(queryAllByText(pokemon).length).toBe(1)
          : expect(queryAllByText(pokemon).length).toBe(0);

        fireEvent.click(getByText(/Próximo pokémon/i));
      });
    });
  })

  describe('Disable "Próximo pokémon" button', () => {
    test('when the list have one pokémon the button must be disable', () => {
      const { getByText, getAllByRole, queryAllByText } = render(
        <MemoryRouter initialEntries={['/']}>
          <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
        </MemoryRouter>
      );
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

  describe('Pokémon Display', () => {
    test('checking the weight', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}>
          <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
        </MemoryRouter>
      );

      expect(getByText(`Average weight: ${pokemonsMock[0].averageWeight.value} ${pokemonsMock[0].averageWeight.measurementUnit}`)).toBeInTheDocument();
    });

    test('checking the image', () => {
      const { getByRole } = render(
        <MemoryRouter initialEntries={['/']}>
          <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
        </MemoryRouter>
      );

      expect(getByRole('img')).toBeInTheDocument();
      expect(getByRole('img').src).toBe(pokemonsMock[0].image);
      expect(getByRole('img').alt).toBe(pokemonsMock[0].name + ' sprite');
    });

    test('should have a link', () => {
      const { getByRole } = render(
        <MemoryRouter initialEntries={['/']}>
          <Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />
        </MemoryRouter>
      );

      expect(getByRole('link')).toBeInTheDocument();
      expect(getByRole('link')).toHaveTextContent(/More Details/i);
      expect(getByRole('link').href).toBe(`http://localhost/pokemons/${pokemonsMock[0].id}`);
    });

    test('when clicked the link must direct to page details', () => {
      const { history, getByRole } = renderWithRouter(<Pokedex pokemons={pokemonsMock} isPokemonFavoriteById={isPokemonFavoriteByIdMock} />)

      expect(getByRole('link')).toBeInTheDocument();

      expect(history.location.pathname).toBe('/');

      fireEvent.click(getByRole('link'));

      expect(history.location.pathname).toBe(`/pokemons/${pokemonsMock[0].id}`);
      
    });
  })
})


