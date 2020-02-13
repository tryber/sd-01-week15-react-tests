export const readFavoritePokemonIds = () => JSON.parse(localStorage.getItem('favoritePokemonIds')) || [];

const endPointLocations = (offset) => `https://pokeapi.co/api/v2/location/?limit=100&offset=${offset}`;

export const apiLocationPokemons = (offset = 100) => fetch(`${endPointLocations(offset)}`).then((response) => response.json().then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

const endPointGenerations = () => 'https://pokeapi.co/api/v2/generation/';

export const apiGenerationsPokemons = () => fetch(`${endPointGenerations()}`).then((response) => response.json().then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

const saveFavoritePokemons = (pokemons) => localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemons));

const addPokemonToFavorites = (pokemonId) => {
  const favoritePokemons = readFavoritePokemonIds();
  const newFavoritePokemons = [...favoritePokemons, pokemonId];

  saveFavoritePokemons(newFavoritePokemons);
};

const removePokemonFromFavorites = (pokemonId) => {
  const favoritePokemons = readFavoritePokemonIds();
  const newFavoritePokemons = favoritePokemons.filter((id) => id !== pokemonId);

  saveFavoritePokemons(newFavoritePokemons);
};

export const updateFavoritePokemons = (pokemonId, isFavorite) =>
  (isFavorite ? addPokemonToFavorites(pokemonId) : removePokemonFromFavorites(pokemonId));
