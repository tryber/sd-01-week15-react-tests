import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';
import { elementType } from 'prop-types';
import { NotFound } from './components';

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
    id: 23,
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
    summary: 'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  },
];

export default pokemons;


function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

//1
test('shows the Pokedéx when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

//2
test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const onePokemon = queryAllByText(/Average weight/i);
  expect(onePokemon.length).toBe(1);
});

//16
test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const onePokemon = queryAllByText(/Average weight/i);
  expect(onePokemon.length).toBe(1);
});

//18
test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(getByText(/Home/i));

  const homeInfo = getByText(/Próximo pokémon/i);
  expect(homeInfo).toBeInTheDocument();
});

//19
test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(getByText(/About/i));

  const aboutInfo = getByText(/About Pokédex/i);
  expect(aboutInfo).toBeInTheDocument();
});

//20
test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(getByText(/Favorite Pokémons/i));

  const noFavoritePokemonInfo = getByText(/No favorite pokemon found/i);
  expect(noFavoritePokemonInfo).toBeInTheDocument();
});

//23
describe('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = renderWithRouter(<NotFound />, { route: '/bad' });
    const getHeading = getByText(/Page requested not found/i);
    expect(getHeading).toBeInTheDocument();
    expect(getHeading.tagName).toBe('H2');
  });

  test('A página deve exibir a imagem https://testing-library.com/', () => {
    const { getByAltText } = renderWithRouter(<NotFound />, { route: '/bad' });
    const altText = getByAltText('Pikachu crying because the page requested was not found');
    expect(altText).toBeInTheDocument(); 
  });
});
