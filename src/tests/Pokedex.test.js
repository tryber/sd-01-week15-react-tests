import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import data from './dataForTests';
import { Pokedex } from '../components';

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
        map:
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
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
    moreInfo:
      'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
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
        map:
          'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
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
        map:
          'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
      },
      {
        location: 'Johto National Park',
        map:
          'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
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
        map:
          'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
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

test('2 - A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const pokemon = queryAllByText(/Average weight:/i);

  expect(pokemon.length).toBe(1);
});
test('3 - Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );
  const btnNextPokemon = getByText(/Próximo pokémon/i);
  expect(btnNextPokemon).toBeInTheDocument();

  for (let i = 0; i < pokemons.length; i += 1) {
    expect(getByText(pokemons[i].name)).toBeInTheDocument();
    fireEvent.click(btnNextPokemon);
  }
  expect(getByText(pokemons[0].name)).toBeInTheDocument();
});
test(' 4 - A Pokédex deve conter botões de filtro', () => {
  const { queryAllByText, getByText, getAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );

  const listaPokemon = [
    ...new Set(pokemons.map((tiposPokemons) => tiposPokemons.type)),
  ];
  const buttonAll = getByText(/All/i);
  let auxiliar = buttonAll;
  for (let i = 0; i < listaPokemon.length; i += 1) {
    expect(auxiliar.nextSibling.textContent).toBe(listaPokemon[i]);
    auxiliar = auxiliar.nextSibling;
    const buttonType =
      getAllByText(listaPokemon[i])[1] || getByText(listaPokemon[i]);
    fireEvent.click(buttonType);
    expect(queryAllByText(listaPokemon[i]).length).toBe(2);
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Average weight:/i).previousSibling.textContent).toBe(
      listaPokemon[i],
    );
  }
});
