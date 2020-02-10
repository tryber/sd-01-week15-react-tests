const getPokeAPILocation = async (list) => {
  const POKE_API = `https://pokeapi.co/api/v2/location/?offset=${list}&limit=100`;
  const response = await fetch(POKE_API);
  const data = await response.json();
  return data.results;
};

export default getPokeAPILocation;
