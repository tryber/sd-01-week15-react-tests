import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';
import { NotFound, Pokedex } from './components';

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
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: {
      value: '48.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Unova Accumula Town',
        map: 'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
      },
    ],
    summary: 'Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes.',
  },
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Faraway Island',
        map: 'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
      },
    ],
    summary: 'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.',
  },
  {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: {
      value: '95.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Route 28',
        map: 'https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
      },
      {
        location: 'Johto Mount Silver',
        map: 'https://cdn.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
      },
    ],
    summary: 'At full gallop, its four hooves barely touch the ground because it moves so incredibly fast.',
  },
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Vermillion City',
        map: 'https://cdn.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
      },
    ],
    summary: 'What sounds like its cry may actually be its snores or the rumblings of its hungry belly.',
  },
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      value: '16.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 45',
        map: 'https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
      },
      {
        location: 'Johto Dragon\'s Den',
        map: 'https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
      },
    ],
    summary: 'They say that if it emits an aura from its whole body, the weather will begin to change instantly.',
  },
];

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

test('1- shows the Pokedéx when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('2- A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const onePokemon = queryAllByText(/Average weight/i);
  expect(onePokemon.length).toBe(1);
});

describe('3- Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    for (let index = 0; index < pokemons.length; index += 1) {
      expect(getByText(pokemons[index].name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    }
  });
  test('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão.', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemon = getByText(/Próximo pokémon/i);

    for (let index = 0; index < pokemons.length; index += 1) {
      fireEvent.click(nextPokemon);
    }
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
});

// describe('4- A Pokédex deve conter botões de filtro', () => {
//   test('A partir da seleção de um botão de tipo, a Pokédex deve circular
// somente pelos pokémons daquele tipo', () => {
//   });
// });

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/All/i)).toBeInTheDocument();
  });
  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/All/i));

  });
});

describe('Requisito 9', () => {
  test('O pokémon exibido na Pokedéx deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const { getByText } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const MOREDETAILS = getByText(/More details/i).href;
      expect(MOREDETAILS).toBe(`http://localhost/pokemons/${pokemon.id}`);
      fireEvent.click(getByText(/Próximo Pokémon/i));
    });
  });
});

test('16- Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const onePokemon = queryAllByText(/Average weight/i);
  expect(onePokemon.length).toBe(1);
});

test('18- Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText(/Home/i));

  const homeInfo = getByText(/Próximo pokémon/i);
  expect(homeInfo).toBeInTheDocument();
});

test('19- Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText(/About/i));

  const aboutInfo = getByText(/About Pokédex/i);
  expect(aboutInfo).toBeInTheDocument();
});

test('20- Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText(/Favorite Pokémons/i));

  const noFavoritePokemonInfo = getByText(/No favorite pokemon found/i);
  expect(noFavoritePokemonInfo).toBeInTheDocument();
});

describe('23- Entrar em uma URL desconhecida exibe a página Not Found', () => {
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
