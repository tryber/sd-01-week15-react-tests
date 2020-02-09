const endPoint = (limit = 20, offset = 20) => `https://pokeapi.co/api/v2/evolution-chain/?limit=${limit}&offset=${offset}`;

// const endPoint = 'https://swapi.co/api/planets/';

const apiLocationPokemons = (limit, offset) => fetch(`${endPoint(limit, offset)}`).then((response) => response.json().then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

// export default getPlanetFetch;

// const apiLocationPokemons = (list) => {
//   const link = `https://pokeapi.co/api/v2/location/?offset=${list}&limit=100`;
//   const response = fetch(link);
//   const data = response.json();
//   return data;
// };

export default apiLocationPokemons;
