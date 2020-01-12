import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup, queryByAltText } from '@testing-library/react';
import PokemonDetails from './PokemonDetails';
import { jsxEmptyExpression } from '@babel/types';
import { exec } from 'child_process';



const favoriteOneElement = {
  99: true,
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

const pokemonsOneElement = [
  {
    id: 99,
    name: 'Golem',
    type: 'Terra',
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
]


const pokemonsAllOneType = [
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
    id: 10,
    name: 'Caterpie',
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
    id: 11,
    name: 'Caterpie2',
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
]


describe('11 -A página de detalhes de pokémon deve exibir o nome, tipo, peso médio e imagem do pokémon exibido', () => {
  afterEach(cleanup);

  const func = jest.fn();

  const test11 = (arrayPokemon, arrayFavorite, index) => {
    const fakeMatch = {
      'params': {
        'id': `${arrayPokemon[index].id}`,
      }
    }
    const { getByText, getByAltText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails pokemons={arrayPokemon} onUpdateFavoritePokemons={func} isPokemonFavoriteById={arrayFavorite} match={fakeMatch} />
      </MemoryRouter>,
    );
    const pokemonValue = arrayPokemon[index];
    const elementName = getByText(pokemonValue.name);
    const elementType = getByText(pokemonValue.type);
    const elementAverageWeight = getByText(`Average weight: ${pokemonValue.averageWeight.value} ${pokemonValue.averageWeight.measurementUnit}`);
    const elementImg = getByAltText(`${pokemonValue.name} sprite`);
    expect(elementType).toBeInTheDocument();
    expect(elementName).toBeInTheDocument();
    expect(elementAverageWeight).toBeInTheDocument();
    expect(elementImg.src).toBe(pokemonValue.image);
  }
  pokemons.forEach((pokemon, index) => {
    test(`11-1 - testando com array padrao - ([${pokemon.name}])`, () => {
      test11(pokemons, isPokemonFavoriteById, index)
    })
  });

  pokemonsOneElement.forEach((pokemon, index) => {
    test(`11-2 - testando com array com um elemento - ([${pokemon.name}])`, () => {
      test11(pokemonsOneElement, favoriteOneElement, index);
    });
  });

  pokemonsAllOneType.forEach((pokemon, index) => {
    test(`11-3 - testando com todos os pokemons com o mesmo tipo - ([${pokemon.name}])`, () => {
      test11(pokemonsAllOneType, isPokemonFavoriteById, index);
    });
  });
});


describe('12 -O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
  afterEach(cleanup);

  const func = jest.fn();

  const test12 = (arrayPokemon, arrayFavorite, index) => {
    const fakeMatch = {
      'params': {
        'id': `${arrayPokemon[index].id}`,
      }
    }
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails pokemons={arrayPokemon} onUpdateFavoritePokemons={func} isPokemonFavoriteById={arrayFavorite} match={fakeMatch} />
      </MemoryRouter>,
    );
    expect(queryByText(/More details/i)).toBeNull()
  }
  pokemons.forEach((pokemon, index) => {
    test(`12-1 - testando com array padrao - ([${pokemon.name}])`, () => {
      test12(pokemons, isPokemonFavoriteById, index)
    })
  });

  pokemonsOneElement.forEach((pokemon, index) => {
    test(`12-2 - testando com array com um elemento - ([${pokemon.name}])`, () => {
      test12(pokemonsOneElement, favoriteOneElement, index);
    });
  });

  pokemonsAllOneType.forEach((pokemon, index) => {
    test(`12-3 - testando com todos os pokemons com o mesmo tipo - ([${pokemon.name}])`, () => {
      test12(pokemonsAllOneType, isPokemonFavoriteById, index);
    });
  });
});

describe('13 - A página de detalhes deve exibir uma seção com um resumo do pokémon', () => {
  afterEach(cleanup);

  const func = jest.fn();

  const test13 = (arrayPokemon, arrayFavorite, index) => {
    const fakeMatch = {
      'params': {
        'id': `${arrayPokemon[index].id}`,
      }
    }
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails pokemons={arrayPokemon} onUpdateFavoritePokemons={func} isPokemonFavoriteById={arrayFavorite} match={fakeMatch} />
      </MemoryRouter>,
    );
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText('Summary').tagName).toBe('H2');
    expect(getByText(arrayPokemon[index].summary)).toBeInTheDocument();
    expect(getByText(arrayPokemon[index].summary).tagName).toBe('P');
  }

  pokemons.forEach((pokemon, index) => {
    test(`13-1 - testando com array padrao - ([${pokemon.name}])`, () => {
      test13(pokemons, isPokemonFavoriteById, index)
    })
  });

  pokemonsOneElement.forEach((pokemon, index) => {
    test(`13-2 - testando com array com um elemento - ([${pokemon.name}])`, () => {
      test13(pokemonsOneElement, favoriteOneElement, index);
    });
  });

  pokemonsAllOneType.forEach((pokemon, index) => {
    test(`13-3 - testando com todos os pokemons com o mesmo tipo - ([${pokemon.name}])`, () => {
      test13(pokemonsAllOneType, isPokemonFavoriteById, index);
    });
  });
});

describe('14 - A página de detalhes deve exibir uma seção com um resumo do pokémon', () => {
  afterEach(cleanup);

  const func = jest.fn();

  const test14 = (arrayPokemon, arrayFavorite, index) => {
    const fakeMatch = {
      'params': {
        'id': `${arrayPokemon[index].id}`,
      }
    }
    const { getByText, getAllByAltText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails pokemons={arrayPokemon} onUpdateFavoritePokemons={func} isPokemonFavoriteById={arrayFavorite} match={fakeMatch} />
      </MemoryRouter>,
    );
    const pokemonValue = arrayPokemon[index];
    expect(getByText(`Game Locations of ${pokemonValue.name}`)).toBeInTheDocument();
    expect(getByText(`Game Locations of ${pokemonValue.name}`).tagName).toBe('H2');
    pokemonValue.foundAt.forEach(value=>{
      expect(getByText(value.location)).toBeInTheDocument();
      expect(getByText(value.location).parentElement.previousSibling.tagName).toBe('IMG');
      expect(getByText(value.location).parentElement.previousSibling.src).toBe(value.map);
    })
    expect(getAllByAltText(`${pokemonValue.name} location`).length).toBe(pokemonValue.foundAt.length);
  }

  pokemons.forEach((pokemon, index) => {
    test(`14-1 - testando com array padrao - ([${pokemon.name}])`, () => {
      test14(pokemons, isPokemonFavoriteById, index)
    })
  });

  pokemonsOneElement.forEach((pokemon, index) => {
    test(`14-2 - testando com array com um elemento - ([${pokemon.name}])`, () => {
      test14(pokemonsOneElement, favoriteOneElement, index);
    });
  });

  pokemonsAllOneType.forEach((pokemon, index) => {
    test(`14-3 - testando com todos os pokemons com o mesmo tipo - ([${pokemon.name}])`, () => {
      test14(pokemonsAllOneType, isPokemonFavoriteById, index);
    });
  });
});

describe('15 - A página de detalhes deve exibir uma seção com um resumo do pokémon', () => {
  afterEach(cleanup);

  const func = jest.fn((array, id)=>{
    array[id] = !array[id]
  });

  const test15 = (arrayPokemon, arrayFavorite, index) => {
    const fakeMatch = {
      'params': {
        'id': `${arrayPokemon[index].id}`,
      }
    }
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails pokemons={arrayPokemon} onUpdateFavoritePokemons={()=>func(arrayFavorite, arrayPokemon[index].id)} isPokemonFavoriteById={arrayFavorite} match={fakeMatch} />
      </MemoryRouter>,
    );
    const checkFavorite = getByText('Pokémon favoritado?');
    expect(checkFavorite).toBeInTheDocument();
    const valueFavorited = arrayFavorite[arrayPokemon[index].id];
    fireEvent.click(checkFavorite);
    expect(valueFavorited).not.toBe(arrayFavorite[arrayPokemon[index].id]);
  }

  pokemons.forEach((pokemon, index) => {
    test(`15-1 - testando com array padrao - ([${pokemon.name}])`, () => {
      test15(pokemons, isPokemonFavoriteById, index)
    })
  });

  pokemonsOneElement.forEach((pokemon, index) => {
    test(`15-2 - testando com array com um elemento - ([${pokemon.name}])`, () => {
      test15(pokemonsOneElement, favoriteOneElement, index);
    });
  });

  pokemonsAllOneType.forEach((pokemon, index) => {
    test(`15-3 - testando com todos os pokemons com o mesmo tipo - ([${pokemon.name}])`, () => {
      test15(pokemonsAllOneType, isPokemonFavoriteById, index);
    });
  });
});
