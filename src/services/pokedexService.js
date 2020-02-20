const locationPokeAPI = (offset) => `https://pokeapi.co/api/v2/location/?limit=100&offset=${offset}`;
export const getLocationPokemonAPI = (offset = 0) => {
  return fetch(locationPokeAPI(offset))
    .then((response) => (
      response.json().then((json) => response && Promise.resolve(json))));
};

const generationPokeAPI = 'https://pokeapi.co/api/v2/generation/';

export const getGenerationPokemonAPI = () => {
  return fetch(generationPokeAPI)
    .then((response) => (
      response.json().then((json) => response && Promise.resolve(json))));
}
export const readFavoritePokemonIds = () => (
  JSON.parse(localStorage.getItem('favoritePokemonIds')) || []
);

const saveFavoritePokemons = (pokemons) => (
  localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemons))
);

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

export const updateFavoritePokemons = (pokemonId, isFavorite) => (
  isFavorite ? addPokemonToFavorites(pokemonId) : removePokemonFromFavorites(pokemonId)
);
