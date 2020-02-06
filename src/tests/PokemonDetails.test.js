import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';

import { pokemons, isPokemonFavoriteById, isNotPokemonFavoriteById } from './dataMock';
import PokemonDetails from '../components/PokemonDetails';


function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

const func = jest.fn();
describe('11 details page', () => {
  afterEach(cleanup);

  const pageDetails = (pokemon) => {
    const match = {
      params: {
        id: pokemon.id,
      },
    };

    const { getByText, getByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        onUpdateFavoritePokemons={func}
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
      />,
    );

    expect(getByText(`${pokemon.name}`)).toBeInTheDocument();
    expect(getByText(`${pokemon.type}`)).toBeInTheDocument();

    const pokemonWeight = getByText(`Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
    expect(pokemonWeight).toBeInTheDocument();

    const imagePokemon = getByAltText(`${pokemon.name} sprite`);
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon.src).toBe(pokemon.image);
  };

  pokemons.forEach((pokemon) => {
    test('11.1 details page must show name, type, average weight and image', () => {
      pageDetails(pokemon);
    });
  });
});

describe('12 No link about more details', () => {
  afterEach(cleanup);

  const noLinkMoreDetails = (pokemon) => {
    const match = {
      params: {
        id: pokemon.id,
      },
    };

    const { queryByText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        onUpdateFavoritePokemons={func}
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
      />,
    );

    expect(queryByText(/More details/i)).toBeNull();
  };

  pokemons.forEach((pokemon) => {
    test('12.1 The link more details cannot show', () => {
      noLinkMoreDetails(pokemon);
    });
  });
});

describe('13 The details page must show a Summary', () => {
  afterEach(cleanup);

  const summaryPokemon = (pokemon) => {
    const match = {
      params: {
        id: pokemon.id,
      },
    };

    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        onUpdateFavoritePokemons={func}
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
      />,
    );

    const summaryTitle = getByText(/Summary/i);
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryTitle.tagName).toBe('H2');

    const summaryText = getByText(`${pokemon.summary}`);
    expect(summaryText).toBeInTheDocument();
  };

  pokemons.forEach((pokemon) => {
    test('13.1 The summary show informations about pokemon', () => {
      summaryPokemon(pokemon);
    });
  });
});

describe('14 The details page show locations maps', () => {
  afterEach(cleanup);

  const locationsMaps = (pokemon) => {
    const match = {
      params: {
        id: pokemon.id,
      },
    };

    const { getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        onUpdateFavoritePokemons={func}
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
      />,
    );

    const headingTitle = getByText(`${pokemon.name} Details`);
    expect(headingTitle).toBeInTheDocument();
    expect(headingTitle.tagName).toBe('H2');
    expect(getByText(`Game Locations of ${pokemon.name}`)).toBeInTheDocument();

    pokemon.foundAt.forEach((location, index) => {
      expect(getByText(location.location)).toBeInTheDocument();
      const imageAlt = getAllByAltText(`${pokemon.name} location`);
      expect(imageAlt[index].src).toBe(location.map);
      expect(imageAlt[index]).toBeInTheDocument();
    });
  };

  pokemons.forEach((pokemon) => {
    test('14.1 The page show the locations maps, title, src and alt', () => {
      locationsMaps(pokemon);
    });
  });
});

// describe('15 page details allows favor a pokemon', () => {
//   afterEach(cleanup);

//   const favorPokemon = (pokemon) => {
//     const match = {
//       params: {
//         id: pokemon.id,
//       },
//     };

//     const { getByText, getByLabelText } = renderWithRouter(
//       <PokemonDetails
//         pokemons={pokemons}
//         onUpdateFavoritePokemons={func}
//         isPokemonFavoriteById={isPokemonFavoriteById}
//         match={match}
//       />,
//     );
//   };

//   pokemons.forEach((pokemon) => {
//     test('15.1 The page must a checkbox and a label', () => {
//       favorPokemon(pokemon);
//     });
//   });
// });
