import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
// import FavoritePokemons from './FavoritePokemons';
import App from '../App';
// import {
//   readFavoritePokemonIds,
// } from '../services/pokedexService';

// import pokemons from '../data';

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
  // function setIsPokemonFavoriteById() {
  //   const favoritePokemonIds = readFavoritePokemonIds();
  //   const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
  //     acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
  //     return acc;
  //   }, {});
  //   return isPokemonFavorite;
  // }

  // const isPokemonFavoriteById = () => setIsPokemonFavoriteById();

  // const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);

  const {
    getByText,
    getByLabelText,
    getByAltText,
    container,
  } = renderWithRouter(
    <App />,
  );
  const nextPoke = () => fireEvent.click(getByText('Próximo pokémon'));
  const favoriteThisPokemon = () => {
    const url = getByText(/^More details$/g);
    fireEvent.click(url);
    const favoriteLabel = getByLabelText(/Pokémon favoritado/g, {
      selector: 'input',
    });
    if (favoriteLabel.checked === false) {
      fireEvent.click(favoriteLabel);
    }
    fireEvent.click(getByText(/home/i));
  };
  const toFavoritePokemons = () => {
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    favoriteThisPokemon();
    nextPoke();
    expect(getByText(/charmander/i)).toBeInTheDocument();
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
});
