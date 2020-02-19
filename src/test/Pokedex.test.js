import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

// jest.mock('react-router-dom', () => {
//   const originalModule = jest.requireActual('react-router-dom');

//   return {
//     BrowserRouter: ({ children }) => (<div> {children} </div>),
//   };
// });

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

test('test 1, renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('test 1, render router is "/"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('test 2, render text "Average weight:"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/Average weight:/i)).toBeInTheDocument();
});

test('test 3, renders a reading with the text `Próximo pokémon`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nextPokemon = getByText(/Próximo pokémon/i);
  expect(nextPokemon).toBeInTheDocument();
  pokemons.map((pokemon) => {
    getByText(`${pokemon.name}`);
    fireEvent.click(nextPokemon);
  });
});

test('test 4, render filter pokemons type', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemonTypes = new Set(pokemons.map((pokemon) => pokemon.type))
  pokemonTypes.forEach((type) => {
    const typeButton = getAllByText(type)[1] || getByText(type);
    fireEvent.click(typeButton);
    const pokemonType = getByText(/Average weight:/i).previousSibling;
    const pokelist = pokemons.filter((pokemon) => pokemon.type === type);
    for (let i = 0; i < pokelist.length; i += 1) {
      expect(pokemonType.textContent).toBe(type);
      fireEvent.click(getByText(/Próximo pokémon/i));
    }
  });
});

test('test 5, click reset filter pokemons type', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const All = getByText(/All/i);
  fireEvent.click(All);
  const previousPokemon = getByText(/Average weight:/i).previousSibling.previousSibling;
  pokemons.map((pokemon) => {
    for (let i = 0; i < pokemon.length; i += 1) {
      fireEvent.click(getByText(/Próximo pokémon/i));
      const currentPokemon = getByText(/Average weight:/i).previousSibling.previousSibling
      expect(currentPokemon).not.toBe(previousPokemon);
    }
  });
});

test('test 6, dynamic button filter pokemon', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonTypes = new Set(pokemons.map((pokemon) => pokemon.type))
  pokemonTypes.forEach((type) => {
    const pokemonTextType = getAllByText(type)[1] || getByText(type);
    expect(pokemonTextType.innerHTML).toBe(type);
  });
});

test('test 7, disable button "Proximo pokémon" if filter only pokemon ', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonElectricType = getAllByText(/Electric/i)[1] || getByText(/Electric/i);
  const previousPokemon = getByText(/Average weight:/i).previousSibling.previousSibling
  fireEvent.click(pokemonElectricType);
  const nextPokemon = getByText(/Próximo pokémon/i);
  fireEvent.click(nextPokemon);
  const currentPokemon = getByText(/Average weight:/i).previousSibling.previousSibling
  expect(currentPokemon).toBe(previousPokemon);
});

test('test 8, pokemon "nome", "tipo", "peso médio", imagem', () => {
  const { getByText, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  pokemons.map((pokemon) => {
    const imageAlt = getByAltText(`${pokemon.name} sprite`);
    expect(imageAlt.src).toBe(pokemon.image);
    const type = getByText(/Average weight:/i).previousSibling;
    expect(type.innerHTML).toBe(pokemon.type);
    const nome = getByText(/Average weight:/i).previousSibling.previousSibling;
    expect(nome.innerHTML).toBe(pokemon.name);
    const average = getByText(/More details/i).previousSibling;
    const averageData = `Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`;
    expect(average.innerHTML).toBe(averageData);
    fireEvent.click(getByText(/Próximo pokémon/i));
  });
});

function renderWithRouter(
  ui,
  {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('9 and 10 tests, render pokemons URL, "URL/pokemons/id"', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonMoreDetails = getByText(/More details/i);
  fireEvent.click(buttonMoreDetails);
  expect(buttonMoreDetails.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
  const pageDetails = getByText(/Pikachu Details/i);
  expect(pageDetails).toBeInTheDocument();
});

test('9 and 10 tests, render next pokemons URL, "URL/pokemons/id"', () => {
  const { getByText } = renderWithRouter(<App />);
  const previousButtonMoreDetails = getByText(/More details/i);
  fireEvent.click(previousButtonMoreDetails);
  const previousPageDetails = getByText(/Pikachu Details/i);
  expect(previousPageDetails).toBeInTheDocument();
  fireEvent.click(getByText(/Home/i));
  fireEvent.click(getByText(/Próximo pokémon/i));
  const currentButtonMoreDetails = getByText(/More details/i);
  fireEvent.click(currentButtonMoreDetails);
  const currentPageDetails = getByText(/Charmander Details/i);
  expect(currentPageDetails).toBeInTheDocument();
  expect(currentButtonMoreDetails.href).toBe(`http://localhost/pokemons/${pokemons[1].id}`);
});

test('test 11, Page more details render name, type, average and image', () => {
  const { getByText, getByAltText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const buttonMoreDetails = getByText(/More details/i);
  fireEvent.click(buttonMoreDetails);
  const PageDetails = getByText(/Pikachu Details/i);
  expect(PageDetails).toBeInTheDocument();
  const imageAlt = getByAltText(`${pokemons[0].name} sprite`);
  expect(imageAlt.src).toBe(pokemons[0].image);
  const type = getByText(/Average weight:/i).previousSibling;
  expect(type.innerHTML).toBe(pokemons[0].type);
  const nome = getByText(/Average weight:/i).previousSibling.previousSibling;
  expect(nome.innerHTML).toBe(pokemons[0].name);
  const average = getAllByText(/Electric/i)[0].nextSibling;
  const averageData = `Average weight: ${pokemons[0].averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`;
  expect(average.innerHTML).toBe(averageData);
});

test('test 12, Page more details not render link more details', () => {
  const { getByText, getByAltText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const previousButtonMoreDetails = getByText(/Average weight:/i).nextSibling;
  fireEvent.click(previousButtonMoreDetails);
  const PageDetails = getByText(/Pikachu Details/i);
  expect(PageDetails).toBeInTheDocument();
  const currentButtonMoreDetails = getByText(/Average weight:/i).nextSibling;
  expect(previousButtonMoreDetails).not.toBe(currentButtonMoreDetails);
});

test('test 13, Page more details render Summary, paragraph', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const ButtonMoreDetails = getByText(/Average weight:/i).nextSibling;
  fireEvent.click(ButtonMoreDetails);
  const summary = getByText(/Summary/i);
  expect(summary).toBeInTheDocument();
  expect(summary.tagName).toBe('H2');
  const summaryParagraph = getByText(/Summary/i).nextSibling;
  expect(summaryParagraph).toBeInTheDocument();
  const sumaryData = pokemons[0].summary;
  expect(summaryParagraph.innerHTML).toBe(sumaryData);
  expect(summaryParagraph.tagName).toBe('P');
});

test('test 14, Page more details render maps, details maps', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const ButtonMoreDetails = getByText(/Average weight:/i).nextSibling;
  fireEvent.click(ButtonMoreDetails);
  const gameLocation = getByText(`${pokemons[0].name} Details`).nextSibling.nextSibling.nextSibling.firstChild;
  expect(gameLocation.innerHTML).toBe(`Game Locations of ${pokemons[0].name}`);
  expect(gameLocation.tagName).toBe('H2');
  const pokemonLocationData = pokemons[0].foundAt.map((log) => log.location);
  const pokemonLocation = gameLocation.nextSibling;
  console.log(em.tagName.innerHTML);
  const listLocation = []
  // const summaryParagraph = getByText(/Summary/i).nextSibling;
  // expect(summaryParagraph).toBeInTheDocument();
  // expect(summaryParagraph.tagName).toBe('P');
});