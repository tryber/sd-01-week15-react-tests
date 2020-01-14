import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { Pokedex } from './components';

const pokemonsList = [
  {
    id: 1,
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
    summary: 'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  },
];

const sameTypePokemonList = [
  {
    id: 1,
    name: 'Raivoso',
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
    id: 2,
    name: 'Esquentadinho',
    type: 'Electric',
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
    name: 'Pedroso',
    type: 'Electric',
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
    id: 4,
    name: 'George',
    type: 'Electric',
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

const uniquePokemonList = [
  {
    id: 1,
    name: 'Voador',
    type: 'Dragon',
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
];

const allFavoritePokemons = {
  1: true,
  2: true,
  3: true,
  4: true,
};

const notFavoritePokemons = {
  1: false,
  2: false,
  3: false,
  4: false,
};

const uniqueFavoritePokemons = {
  1: true,
};

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

describe('Pokedéx should display only 1 pokémon', () => {
  function ex2(pokemons, isPokemonFavoriteById) {
    const { queryAllByText, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      const allPokemon = queryAllByText(pokemon.name);
      expect(allPokemon.length).toBe(1);
      fireEvent.click(nextButton);
    });
  }

  test('case 1', () => {
    ex2(pokemonsList, allFavoritePokemons);
  });
  test('case 2', () => {
    ex2(uniquePokemonList, uniqueFavoritePokemons);
  });
  test('case 3', () => {
    ex2(sameTypePokemonList, notFavoritePokemons);
  });
});

describe('shows the next pókemon when press the button', () => {
  function ex3(pokemons, isPokemonFavoriteById) {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();

    for (let i = 0; i < pokemons.length; i += 1) {
      expect(getByText(pokemons[i].name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    }
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  }
  test('case 1', () => {
    ex3(pokemonsList, allFavoritePokemons);
  });
  test('case 2', () => {
    ex3(uniquePokemonList, uniqueFavoritePokemons);
  });
  test('case 3', () => {
    ex3(sameTypePokemonList, notFavoritePokemons);
  });
});

describe('filter the pokedéx by the type of pokemon', () => {
  function ex4(pokemons, isPokemonFavoriteById) {
    const { queryAllByText, getByText, getAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );

    const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];
    const buttonAll = getByText(/All/i);
    let aux = buttonAll;
    for (let i = 0; i < pokemonTypes.length; i += 1) {
      expect(aux.nextSibling.textContent).toBe(pokemonTypes[i]);
      aux = aux.nextSibling;

      const buttonType = getAllByText(pokemonTypes[i])[1] || getByText(pokemonTypes[i]);
      fireEvent.click(buttonType);
      expect(queryAllByText(pokemonTypes[i]).length).toBe(2);
      fireEvent.click(getByText(/Próximo pokémon/i));
      expect(getByText(/Average weight:/i).previousSibling.textContent).toBe(pokemonTypes[i]);
    }
  }

  test('case 1', () => {
    ex4(pokemonsList, allFavoritePokemons);
  });
  test('case 2', () => {
    ex4(uniquePokemonList, uniqueFavoritePokemons);
  });
  test('case 3', () => {
    ex4(sameTypePokemonList, notFavoritePokemons);
  });
});

describe('Pokedéx must contain a reset button', () => {
  function ex5(pokemons, isPokemonFavoriteById) {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    const resetButton = getByText(/All/i);
    expect(resetButton).toBeInTheDocument();

    const nextButton = getByText(/Próximo pokémon/i);
    const allPokemons = pokemons.map((pokemon) => pokemon.name);

    const containedPokemons = () => allPokemons.map(() => {
      const pokemonName = getByText(/Average weight:/i).previousSibling.previousSibling.textContent;
      fireEvent.click(nextButton);
      return pokemonName;
    });

    expect(containedPokemons()).toStrictEqual(allPokemons);
    fireEvent.click(resetButton.nextSibling);
    fireEvent.click(resetButton);
    expect(containedPokemons()).toStrictEqual(allPokemons);
  }

  test('case 1', () => {
    ex5(pokemonsList, allFavoritePokemons);
  });
  test('case 2', () => {
    ex5(uniquePokemonList, uniqueFavoritePokemons);
  });
  test('case 3', () => {
    ex5(sameTypePokemonList, notFavoritePokemons);
  });
});

describe('Pokedéx should render a filter button to each type of pokemóns', () => {
  function ex6(pokemons, isPokemonFavoriteById) {
    const { getByText, getAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );

    const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];
    pokemonTypes.forEach((type) => {
      const buttonType = getAllByText(type)[1] || getByText(type);
      expect(buttonType).toBeInTheDocument();
      expect(getByText(/All/i)).toBeInTheDocument();
    });
  }

  test('case 1', () => {
    ex6(pokemonsList, allFavoritePokemons);
  });
  test('case 2', () => {
    ex6(uniquePokemonList, uniqueFavoritePokemons);
  });
  test('case 3', () => {
    ex6(sameTypePokemonList, notFavoritePokemons);
  });
});

describe('the button `Próximo pokémon` should be disabled if the list has only 1 pokémon', () => {
  function ex7(pokemons, isPokemonFavoriteById) {
    const { getByText, getAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
      </MemoryRouter>,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];

    pokemonTypes.forEach((type) => {
      const buttonType = getAllByText(type)[1] || getByText(type);
      fireEvent.click(buttonType);
      const pokemonName = getByText(/Average weight:/i).previousSibling.previousSibling.textContent;
      fireEvent.click(nextButton);
      const nextPokemon = getByText(/Average weight:/i).previousSibling.previousSibling.textContent;
      if (pokemonName === nextPokemon) expect(nextButton.disabled).toBe(true);
      else expect(nextButton.disabled).toBe(false);
    });
  }

  test('case 1', () => {
    ex7(pokemonsList, allFavoritePokemons);
  });
  test('case 2', () => {
    ex7(uniquePokemonList, uniqueFavoritePokemons);
  });
  test('case 3', () => {
    ex7(sameTypePokemonList, notFavoritePokemons);
  });
});
