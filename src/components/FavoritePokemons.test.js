import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import {
  readFavoritePokemonIds,
} from '../services/pokedexService';

import pokemons from '../data';

afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('22 - the favorite pokemons page must exhibit the favorite pokemons', () => {
  function setIsPokemonFavoriteById() {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    return isPokemonFavorite;
  }

  const isPokemonFavoriteById = () => setIsPokemonFavoriteById();

  const {
    getByText,
    getByLabelText,
    getByAltText,
    container,
  } = renderWithRouter(
    <App />,
  );
  const nextPokeButton = getByText(/próximo pokémon/i);
  const nextPoke = () => fireEvent.click(nextPokeButton);

  const homeButton = getByText(/home/i);

  const favoriteThisPokemon = () => {
    const url = getByText(/^More details$/g);
    fireEvent.click(url);
    const favoriteLabel = getByLabelText(/Pokémon favoritado/g, {
      selector: 'input',
    });

    if (favoriteLabel.checked === false) {
      fireEvent.click(favoriteLabel);
    }

    fireEvent.click(homeButton);
  };

  const toFavoritePokemons = () => {
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    favoriteThisPokemon();
    nextPoke();
    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    favoriteThisPokemon();
  };

  toFavoritePokemons();

  it('the page must only exhibit favorited pokemons', () => {
    fireEvent.click(getByText(/favorite Pokémons/i));

    const isPikachuFavorite = getByAltText(/pikachu is marked as favorite/i);
    const isCharmanderFavorite = getByAltText(/charmander is marked as favorite/i);

    expect(isPikachuFavorite).toBeInTheDocument();
    expect(isCharmanderFavorite).toBeInTheDocument();

    const allFavoritedPokes = container.querySelectorAll('.favorite-icon');

    expect(allFavoritedPokes.length).toBe(2);
    expect(allFavoritedPokes[0].alt).toBe(isPikachuFavorite.alt);
    expect(allFavoritedPokes[1].alt).toBe(isCharmanderFavorite.alt);
  });

  it('if no pokemon found, expected message returns', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );
    const unfavoriteThisPokemon = () => {
      const url = getByText(/^More details$/g);
      fireEvent.click(url);

      const favoriteLabel = getByLabelText(/Pokémon favoritado/g, {
        selector: 'input',
      });

      if (favoriteLabel.checked === true) {
        fireEvent.click(favoriteLabel);
      }

      fireEvent.click(getByText(/home/i));
    };

    unfavoriteThisPokemon();
    nextPoke();
    unfavoriteThisPokemon();

    const favPokeList = isPokemonFavoriteById();
    Object.keys(favPokeList).forEach((key) => expect(favPokeList[key]).toBeFalsy());
    fireEvent.click(getByText(/favorite pokémons/i));
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
