export const pokemonsMock = [
  {
    id: 1,
    name: 'Ditto',
    type: 'Normal',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png',
    moreInfo: 'https://archives.bulbagarden.net/media/upload/5/50/Spr_3e_132.png',
    foundAt: [
      {
        location: 'Pokémon Mansion',
        map: 'https://cdn.bulbagarden.net/upload/5/58/Kanto_Cinnabar_Island_Map.png',
      },
      {
        location: 'Cerulean Cave',
        map: 'https://cdn.bulbagarden.net/upload/0/0b/Kanto_Cerulean_Cave_Map.png',
      },
    ],
    summary: 'It is not known to evolve into or from any other Pokémon.',
  },
  {
    id: 2,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 3,
    name: 'Jigglypuff',
    type: 'Normal',
    averageWeight: {
      value: '5.5',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/1/17/Spr_4h_039.png',
    moreInfo: 'https://cdn.bulbagarden.net/upload/7/76/Kanto_Route_6_Map.png',
    foundAt: [
      {
        location: 'Route 6',
        map: 'https://cdn.bulbagarden.net/upload/7/76/Kanto_Route_6_Map.png',
      },
      {
        location: 'Route 3',
        map: 'https://cdn.bulbagarden.net/upload/7/76/Kanto_Route_3_Map.png',
      },
    ],
    summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
  },
  {
    id: 4,
    name: 'Lapras',
    type: 'Water',
    averageWeight: {
      value: '200.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/6/69/Spr_4h_131.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Lapras_(Pokémon)',
    foundAt: [
      {
        location: 'Silph Co',
        map: 'https://cdn.bulbagarden.net/upload/6/6a/Kanto_Saffron_City_Map.png',
      },
    ],
    summary: 'A gentle soul that can read the minds of people. It can ferry people across the sea on its back.',
  },
  {
    id: 5,
    name: 'Squirtle',
    type: 'Water',
    averageWeight: {
      value: '9.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/d/d6/Spr_4d_007_s.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Squirtle_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Vermilion City',
        map: 'https://cdn.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
      },
    ],
    summary: 'Shoots water at prey while in the water. Withdraws into its shell when in danger.',
  },
  {
    id: 6,
    name: 'Staryu',
    type: 'Water',
    averageWeight: {
      value: '34.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/d/d9/Spr_3e_120.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Staryu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Route 19',
        map: 'https://cdn.bulbagarden.net/upload/5/51/Kanto_Route_19_Map.png',
      },
      {
        location: 'Route 21',
        map: 'https://cdn.bulbagarden.net/upload/e/e9/Kanto_Route_21_Map.png',
      },
    ],
    summary: 'As long as the center section is unharmed, it can grow back fully even if it is chopped to bits.',
  },
];

export const isPokemonFavoriteByIdMock = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: true,
  6: true,
};

export const matchMock = jest.fn((id) => ({ params: { id } }));

export const onUpdateFavoritePokemonsMock = jest.fn((isPokemon, id) => {
  let value = isPokemon[id];
  value = !value;
});
