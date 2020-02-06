const ExportPokeAPILocation = (list) => {
  const POKE_API = `https://pokeapi.co/api/v2/location/?offset=${list}&limit=100`;
  const response = fetch(POKE_API);
  const data = response.json();
  return data;
};

export default ExportPokeAPILocation;
