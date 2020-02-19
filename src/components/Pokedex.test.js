import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import App from '../App';
import Pokedex from './Pokedex';
import pokemonList from '../services/pokemonList';
import PokemonDetails from './PokemonDetails';

afterEach(cleanup);
const mockFunc = jest.fn();

const isPokemonFavoriteById = {
  25: true,
  4: false,
  10: false,
  23: false,
  65: false,
  151: true,
  78: false,
  143: false,
  148: false,
};

const expectedTypes = [...new Set(pokemonList.map(({ type }) => type))];
const expectedNames = pokemonList.map(({ name }) => name);

describe('2.', () => {
  test('Shows just one pokemon', () => {
    const { queryAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(queryAllByText(/Average weight/i).length).toBe(1);
  });
});

describe('3.', () => {
  test('Pressing the "Next" button, shows next pokemon from the list.', () => {
    const { queryByText, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemonList} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    const nextButton = queryByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();

    for (let i = 0; i < pokemonList.length; i += 1) {
      expect(getByText(pokemonList[i].name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    }
    expect(getByText(pokemonList[0].name)).toBeInTheDocument();
  });
});

describe('4.', () => {
  test('Pokedex have button filter for all types of pokemon', () => {
    const { getAllByText, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemonList} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    expectedTypes.forEach((type) => {
      const buttonType = getAllByText(type)[1] || getByText(type);
      expect(buttonType).toBeInTheDocument();
      fireEvent.click(buttonType);
      expect(getAllByText(type).length).toBe(2);
      fireEvent.click(getByText(/Próximo pokémon/i));
      expect(getAllByText(type).length).toBe(2);
    });
  });
});

describe('5', () => {
  test('Pokedex need button to reset filters', () => {
    const { queryByText, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemonList} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    expectedNames.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(queryByText(/Próximo pokémon/i));
    });
    const allButton = queryByText(/All/i);
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    expectedNames.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(queryByText(/Próximo pokémon/i));
    });
  });
});

describe('6', () => {
  test('Testing the existence of a button for each type of pokemon', () => {
    const { getAllByText, queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemonList} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    expectedTypes.forEach((type) => {
      const haveFilterButton = getAllByText(type)[1] || queryByText(type);
      expect(haveFilterButton.tagName).toBe('BUTTON');
      expect(haveFilterButton).toBeInTheDocument();
      expect(queryByText(/All/i)).toBeInTheDocument();
    });
  });
});

describe('7', () => {
  test('if Pokemon list haves just one type of pokemon, the button was disabled', () => {
    const { getAllByText, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemonList} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    expectedTypes.forEach((type) => {
      const typeButton = getAllByText(type)[1] || getByText(type);
      fireEvent.click(typeButton);
      const details = getByText(/More details/i);
      const previousPokemon = details.previousSibling.previousSibling.previousSibling.textContent;
      fireEvent.click(nextButton);
      const actualPokemon = details.previousSibling.previousSibling.previousSibling.textContent;
      if (actualPokemon === previousPokemon) {
        expect(nextButton.disabled).toBeTruthy();
      } else {
        expect(nextButton.disabled).toBeFalsy();
      }
    });
  });
});

describe('8', () => {
  test('pokedex shows a name, type, average weight and image of pokemon', () => {
    const { getByText, getByAltText, getAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemonList} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    pokemonList.forEach((pokemon) => {
      const {
        name,
        type,
        averageWeight,
      } = pokemon;
      const {
        value,
        measurementUnit,
      } = averageWeight;
      const weight = `Average weight: ${value} ${measurementUnit}`;
      const alt = `${name} sprite`;
      const typeOfPokemon = getAllByText(type)[0] || getByText(type);
      expect(getByText(name)).toBeInTheDocument();
      expect(typeOfPokemon).toBeInTheDocument();
      expect(getByText(weight)).toBeInTheDocument();
      expect(getByAltText(alt)).toBeInTheDocument();
      fireEvent.click(getByText(/Próximo pokémon/i));
    });
  });
});

describe('9', () => {
  test('Pokedex renders text when clicked redirects to that pokemon`s page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemonList} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    pokemonList.forEach((pokemon) => {
      const details = getByText(/More details/i).href;
      expect(details).toBe(`http://localhost/pokemons/${pokemon.id}`);
      fireEvent.click(getByText(/Próximo pokémon/i));
    });
  });
});

describe('10', () => {
  test('When clicked a link navigation of pokemon, redirect to pokemon/id, when ID is pokemon ID', () => {

  });
});

describe('11', () => {
  test('More Details shows a name, type, average weight and image of pokemon', () => {
    pokemonList.forEach((pokemon) => {
      const match = {
        params: {
          id: `${pokemon.id}`,
        },
      };
      const { getByText, getByAltText } = render(
        <MemoryRouter>
          <PokemonDetails
            pokemons={pokemonList}
            onUpdateFavoritePokemons={mockFunc}
            isPokemonFavoriteById={isPokemonFavoriteById}
            match={match}
          />
        </MemoryRouter>,
      );
      const {
        value,
        measurementUnit,
      } = pokemon.averageWeight;
      const pokemonAverageWeight = getByText(`Average weight: ${value} ${measurementUnit}`);
      expect(pokemonAverageWeight).toBeInTheDocument();
      const altImage = getByAltText(`${pokemon.name} sprite`);
      expect(altImage.src).toBe(pokemon.image);
    });
  });
});

describe('12', () => {
  test('The Pokémon on the details page must not contain a navigation link to details', () => {
    const moreDetails = (pokemon) => {
      const match = {
        params: {
          id: `${pokemon.id}`,
        },
      };
      const { queryByText } = render(
        <MemoryRouter>
          <PokemonDetails
            pokemons={pokemonList}
            onUpdateFavoritePokemons={mockFunc}
            isPokemonFavoriteById={isPokemonFavoriteById}
            match={match}
          />
        </MemoryRouter>,
      );
      expect(queryByText('More details')).not.toBeInTheDocument();
    };
    pokemonList.forEach((pokemon) => {
      moreDetails(pokemon);
    });
  });
});
