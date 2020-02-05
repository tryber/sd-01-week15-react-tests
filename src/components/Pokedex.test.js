import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Pokedex from './Pokedex';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => (<div> {children} </div>),
  }
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}
const favoriteOneElement = {
  99: true,
}

const isPokemonFavoriteByIdAllTrue = {
  25: true,
  4: true,
  10: true,
  11: true,
}

const isPokemonFavoriteByIdAllFalse = {
  25: false,
  4: false,
  10: false,
  11: false,
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



test('Pokédex should only display one Pokémon at a time.', () => {
  const { getAllByText, getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
    </MemoryRouter>,
  );

  pokemons.forEach(() => {
    fireEvent.click(getByText('Próximo pokémon'));
    const pokemoncont = getAllByText('More details').length;
    expect(pokemoncont).toBe(1);
  });
});

test('3.1 - Testando proximo botão, se ao ser clicado ele passa para o proximo pokemon', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
    </MemoryRouter>,
  );

  const expectNames = pokemons.map(pokemon => pokemon.name);;
  const names = [];
  const btnNext = getByText('Próximo pokémon');
  expect(btnNext).toBeInTheDocument();
  const details = getByText('More details');
  for (let cont = 0; cont < pokemons.length; cont += 1) {
    names.push(details.previousSibling.previousSibling.previousSibling.textContent)
    fireEvent.click(btnNext);
  }
  expect(names).toStrictEqual(expectNames);
});

test('3.1.2 - Testando proximo botão, se ao ser clicado ele passa para o proximo pokemon agora possuindo apenas um pokemon na lista', () => {

  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemonsOneElement} isPokemonFavoriteById={favoriteOneElement} />
    </MemoryRouter>,
  );

  const expectNames = [pokemonsOneElement[0].name];
  const names = [];
  const btnNext = getByText('Próximo pokémon');
  expect(btnNext).toBeInTheDocument();
  const details = getByText('More details');
  for (let cont = 0; cont < pokemonsOneElement.length; cont += 1) {
    names.push(details.previousSibling.previousSibling.previousSibling.textContent)
    fireEvent.click(btnNext);
  }
  expect(names).toStrictEqual(expectNames);
});


test('3.2.1- Ao passar por todos os pokemons ele retornar ao primeiro', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
    </MemoryRouter>,
  );
  const expectName = pokemons[0].name;
  let name;
  const details = getByText('More details');
  const btnNext = getByText('Próximo pokémon');
  for (let cont = 0; cont < pokemons.length; cont += 1) {
    fireEvent.click(btnNext);
    name = details.previousSibling.previousSibling.previousSibling.textContent
  }
  expect(name).toStrictEqual(expectName);
});

test('3.2.1- Ao passar por todos os pokemons ele retornar ao primeiro com apenas um pokemon no array', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemonsOneElement} isPokemonFavoriteById={favoriteOneElement} />
    </MemoryRouter>,
  );
  const expectName = pokemonsOneElement[0].name;
  let name;
  const details = getByText('More details');
  const btnNext = getByText('Próximo pokémon');
  for (let cont = 0; cont < pokemonsOneElement.length; cont += 1) {
    fireEvent.click(btnNext);
    name = details.previousSibling.previousSibling.previousSibling.textContent
  }
  expect(name).toStrictEqual(expectName);
});



describe('4 -  A Pokédex deve conter botões de filtro- Botao filtro ser clicado e apenas navegar nos pokemons daquele filtro', () => {
  afterEach(cleanup);
  const test4 = (arrayPokemon, arrayFavorite) => {
    const { getByText, getAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={arrayPokemon} isPokemonFavoriteById={arrayFavorite} />
      </MemoryRouter>,
    );
    const btnNext = getByText('Próximo pokémon');
    const getAllType = [...new Set(arrayPokemon.map(pokemon => pokemon.type))];
    getAllType.forEach((type) => {
      const btnType = getAllByText(type)[1] || getByText(type);
      expect(btnType).toBeInTheDocument();
      fireEvent.click(btnType);
      fireEvent.click(btnNext);
      const details = getByText('More details');
      expect(details.previousSibling.previousSibling.textContent).toBe(type);
    })
  }

  test('4-1 - testando com array padrao', () => {
    test4(pokemons, isPokemonFavoriteById)
  });

  test('4-2 - testando com array com um elemento', () => {
    test4(pokemonsOneElement, favoriteOneElement)
  });

  test('4-3 - testando com todos os pokemons com o mesmo tipo', () => {
    test4(pokemonsAllOneType, isPokemonFavoriteById)
  });
});

describe('5 -  A Pokédex deve conter um botão para resetar o filtro', () => {
  afterEach(cleanup);
  const test5 = (arrayPokemon, arrayFavorite) => {
    const { getByText, getAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={arrayPokemon} isPokemonFavoriteById={arrayFavorite} />
      </MemoryRouter>,
    );
    const getAllName = arrayPokemon.map(pokemon => pokemon.name);
    const btnAll = getByText('All');
    const btnNext = getByText('Próximo pokémon');
    expect(btnAll).toBeInTheDocument();
    const details = getByText('More details');
    const names = () => arrayPokemon.map(() => {
      const name = details.previousSibling.previousSibling.previousSibling.textContent;
      fireEvent.click(btnNext);
      return name;
    })
    expect(names()).toStrictEqual(getAllName);
    const btnType = btnAll.nextSibling;
    expect(btnType).toBeInTheDocument();
    fireEvent.click(btnType);
    fireEvent.click(btnAll);
    expect(names()).toStrictEqual(getAllName);
  }

  test('5-1 - testando com array padrao', () => {
    test5(pokemons, isPokemonFavoriteById)
  });

  test('5-2 - testando com array com um elemento', () => {
    test5(pokemonsOneElement, favoriteOneElement)
  });

  test('5-3 - testando com todos os pokemons com o mesmo tipo', () => {
    test5(pokemonsAllOneType, isPokemonFavoriteById)
  });
});

describe('6 - Verificar se o programa está criando todos os botoes de type corretamente e dinamicamente', () => {
  afterEach(cleanup);
  const test6 = (arrayPokemon, arrayFavorite) => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={arrayPokemon} isPokemonFavoriteById={arrayFavorite} />
      </MemoryRouter>,
    );
    const getAllType = [...new Set(arrayPokemon.map(pokemon => pokemon.type))];
    const btnAll = getByText('All');
    let aux = btnAll;
    for (let cont = 0; cont < getAllType.length; cont += 1) {
      const btnType = aux.nextSibling;
      aux = btnType;
      expect(btnType).toBeInTheDocument();
      expect(btnType.textContent).toBe(getAllType[cont]);
    }
  }

  test('6-1 - testando com array padrao', () => {
    test6(pokemons, isPokemonFavoriteById)
  });

  test('6-2 - testando com array com um elemento', () => {
    test6(pokemonsOneElement, favoriteOneElement)
  });

  test('6-3 - testando com todos os pokemons com o mesmo tipo', () => {
    test6(pokemonsAllOneType, isPokemonFavoriteById)
  });
});

describe('7 -O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
  afterEach(cleanup);
  const test7 = (arrayPokemon, arrayFavorite) => {
    const { getByText, getAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={arrayPokemon} isPokemonFavoriteById={arrayFavorite} />
      </MemoryRouter>,
    );
    const getAllType = [...new Set(arrayPokemon.map(pokemon => pokemon.type))];
    const btnNext = getByText('Próximo pokémon');
    getAllType.forEach(type => {
      const btnType = getAllByText(type)[1] || getByText(type);
      fireEvent.click(btnType);
      const details = getByText('More details');
      const oldName = details.previousSibling.previousSibling.previousSibling.textContent;
      fireEvent.click(btnNext);
      const newName = details.previousSibling.previousSibling.previousSibling.textContent;
      if (oldName === newName) {
        expect(btnNext.disabled).toBe(true);
      }
    })
  }

  test('7-1 - testando com array padrao', () => {
    test7(pokemons, isPokemonFavoriteById);
  });

  test('7-2 - testando com array com um elemento', () => {
    test7(pokemonsOneElement, favoriteOneElement);
  });

  test('7-3 - testando com todos os pokemons com o mesmo tipo', () => {
    test7(pokemonsAllOneType, isPokemonFavoriteById);
  });
});


describe('8 -A Pokedéx deve exibir o nome, tipo, peso médio e imagem do pokémon exibido', () => {
  afterEach(cleanup);
  const test8 = (arrayPokemon, arrayFavorite) => {
    const { getByText, getAllByText, getByAltText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={arrayPokemon} isPokemonFavoriteById={arrayFavorite} />
      </MemoryRouter>,
    );
    const btnNext = getByText('Próximo pokémon');
    arrayPokemon.forEach(pokemon => {
      const type = getAllByText(pokemon.type)[0];
      const name = getByText(pokemon.name);
      const averageWeight = getByText(`Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
      const img = getByAltText(`${pokemon.name} sprite`);
      expect(type).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(averageWeight).toBeInTheDocument();
      expect(img.src).toBe(pokemon.image);
      fireEvent.click(btnNext);
    })
  }

  test('8-1 - testando com array padrao', () => {
    test8(pokemons, isPokemonFavoriteById);
  });

  test('8-2 - testando com array com um elemento', () => {
    test8(pokemonsOneElement, favoriteOneElement);
  });

  test('8-3 - testando com todos os pokemons com o mesmo tipo', () => {
    test8(pokemonsAllOneType, isPokemonFavoriteById);
  });
});

describe('9 -O pokémon exibido na Pokedéx deve conter um link de navegação para exibir detalhes deste pokémon', () => {
  afterEach(cleanup);
  const test9 = (arrayPokemon, arrayFavorite) => {
    const { getByText, getAllByText, getByAltText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={arrayPokemon} isPokemonFavoriteById={arrayFavorite} />
      </MemoryRouter>,
    );
    const btnNext = getByText('Próximo pokémon')
    arrayPokemon.forEach(pokemon => {
      const details = getByText('More details');
      expect(details.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
      fireEvent.click(btnNext);
    })
  }

  test('9-1.1 - testando com array padrao', () => {
    test9(pokemons, isPokemonFavoriteById);
  });

  test('9-2 - testando com array com um elemento', () => {
    test9(pokemonsOneElement, favoriteOneElement);
  });

  test('9-3 - testando com todos os pokemons com o mesmo tipo', () => {
    test9(pokemonsAllOneType, isPokemonFavoriteById);
  });
});

describe('10', () => {
  afterEach(cleanup);
  test('10 - Testando botao more details ', () => {
    const { history, getByRole } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
    );
    expect(getByRole('link')).toBeInTheDocument();

    expect(history.location.pathname).toBe('/');
    const idPokemon = pokemons[0].id;
    fireEvent.click(getByRole('link'));
    expect(history.location.pathname).toBe(`/pokemons/${idPokemon}`);
  });
});




describe('16 - O pokémon exibido na Pokedéx deve conter um link de navegação para exibir detalhes deste pokémon', () => {
  afterEach(cleanup);
  const test16 = (arrayPokemon, arrayFavorite) => {
    const { getByText, getByAltText, queryByAltText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedex pokemons={arrayPokemon} isPokemonFavoriteById={arrayFavorite} />
      </MemoryRouter>,
    );
    const btnNext = getByText('Próximo pokémon')
    arrayPokemon.forEach(pokemon => {
      if (arrayFavorite[pokemon.id]) {
        const star = getByAltText(`${pokemon.name} is marked as favorite`);
        expect(star).toBeInTheDocument();
        expect(star.src).toBe('http://localhost/star-icon.svg');
      } else {
        expect(queryByAltText(`${pokemon.name} is marked as favorite`)).not.toBeInTheDocument();
      }
      fireEvent.click(btnNext);
    })
  }

  test('16-1.1 - testando com array padrao', () => {
    test16(pokemons, isPokemonFavoriteById);
  });

  test('16-1.2 - testando com array padrao todos favoritados', () => {
    test16(pokemons, isPokemonFavoriteByIdAllTrue);
  });

  test('16-1.3 - testando com array padrao sem favoritos', () => {
    test16(pokemons, isPokemonFavoriteByIdAllFalse);
  });

  test('16-2 - testando com array com um elemento', () => {
    test16(pokemonsOneElement, favoriteOneElement);
  });

  test('16-3 - testando com todos os pokemons com o mesmo tipo', () => {
    test16(pokemonsAllOneType, isPokemonFavoriteById);
  });
});
