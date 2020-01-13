import React from 'react';
import App from './App'
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Pokedex from './components/Pokedex';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

const isPokemonFavoriteById = {
  25: true,
  4: false,
  10: true,
  11: false,
}

const pokemons = [
  {
    id: 25,
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
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
    id: 10,
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
    summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
  },
  {
    id: 11,
    name: 'Caterpie2',
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
    summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
  },
]



test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokedéx when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Pokédex should only display one Pokémon at a time.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
    </MemoryRouter>,
  );

  const pokemoncont = getByText('More details');
  expect(pokemoncont).toBeInTheDocument();
});

test('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('Home').href).toBe('http://localhost/' || '/');
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('About').href).toBe('http://localhost/about' || '/about');
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons').href).toBe('http://localhost/favorites' || '/favorites');
});

describe('Rotas', () => {
  afterEach(cleanup);

  test('18- Navegação click no botao HOME ', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Home'));

    const titleHome = getByText('Encountered pokémons');
    expect(titleHome).toBeInTheDocument();
  });

  test('19- Navegação click no botao Pokédex', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('About'));

    const about = getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  test('20- Navegação click no botao Favoritos', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Favorite Pokémons'));

    const favorite = getByText('No favorite pokemon found');
    expect(favorite).toBeInTheDocument();
  });
});
