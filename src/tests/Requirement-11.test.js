import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { PokemonDetails } from '../components';

afterEach(cleanup);

const pokemons = [
  {
    id: 1,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary:
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
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
    summary:
      'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 3,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 30',
        map: 'https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
      },
      {
        location: 'Johto Route 31',
        map: 'https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
      },
      {
        location: 'Ilex Forest',
        map: 'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
      },
      {
        location: 'Johto National Park',
        map: 'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
      },
    ],
    summary:
      'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
  },
  {
    id: 4,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: {
      value: '6.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Goldenrod Game Corner',
        map: 'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
      },
    ],
    summary:
      'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  },
];
const isPokemonFavoriteById = {
  1: true,
  2: false,
  3: false,
  4: false,
};

describe('Exigência → 11 ', () => {
  function testPossiblePoker(pokemon) {
    const match = {
      params: {
        id: `${pokemon.id}`,
      },
    };
    const updateFavoritePokemons = jest.fn((list, id) => {
      list[id] = !list[id];
    });
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={() => updateFavoritePokemons(isPokemonFavoriteById, pokemon.id)}
          isPokemonFavoriteById={isPokemonFavoriteById}
          match={match}
        />
      </MemoryRouter>,
    );
    const checkboxBtn = getByLabelText(/Pokémon favoritado?/i);
    expect(getByLabelText(/Pokémon favoritado?/i)).toBeInTheDocument();
    const isExact = isPokemonFavoriteById[pokemon.id];
    fireEvent.click(checkboxBtn);
    expect(isExact).not.toBe(isPokemonFavoriteById[pokemon.id]);
  }

  pokemons.forEach((pokemon) => test(`- A página de detalhes deve permitir 
  favoritar um pokémon com o nome ${pokemon.name}`, () => {
    testPossiblePoker(pokemon);
  }));
});
