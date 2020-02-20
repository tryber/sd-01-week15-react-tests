import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent, cleanup, waitForDomChange } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import Locations from '../components/Locations';
import { Pokedex, PokemonDetails, About, FavoritePokemons, NotFound } from '../components';

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

const isPokemonFavoriteById = {
  25: true,
  4: false,
  10: true,
  11: false,
};

const isNotPokemonFavoriteById = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
};

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

test('test 2, A Pokédex deve exibir apenas um pokémon por vez"', () => {
  const { queryAllByText, getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );
  pokemons.forEach((pokemon) => {
    const pokemonName = queryAllByText(pokemon.name);
    expect(pokemonName.length).toBe(1);
    fireEvent.click(getByText(/Próximo pokémon/i));
  });
});

test('test 3.1, O botão deve conter o texto Próximo pokémon;', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );
  const nextPokemon = getByText(/Próximo pokémon/i);
  expect(nextPokemon).toBeInTheDocument();
});

test('test 3.2, Cliques sucessivos no botão P devem mostrar o próximo pokémon da lista', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );
  for (let i = 0; i < pokemons.length; i += 1) {
    expect(getByText(pokemons[i].name)).toBeInTheDocument()
    fireEvent.click(getByText(/Próximo pokémon/i));
  }
});

test('test 3.3, Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );
  for (let i = 0; i < pokemons.length; i += 1) {
    expect(getByText(pokemons[i].name)).toBeInTheDocument()
    fireEvent.click(getByText(/Próximo pokémon/i));
  }
  const pokemonFirst = getByText(pokemons[0].name);
  expect(pokemonFirst).toBeInTheDocument();
});

test('test 4.1, A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );

  const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];
  pokemonTypes.forEach((type) => {
    const typeButton = getAllByText(type)[1] || getByText(type);
    fireEvent.click(typeButton);
    const pokemonTypeText = getAllByText(type)[0];
    expect(pokemonTypeText.innerHTML).toBe(type);
    fireEvent.click(getByText(/Próximo pokémon/i));
  });
});

test('test 4.2, O texto do botão deve ser o nome do tipo, p. ex. Psychic.', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );

  const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];
  pokemonTypes.forEach((type) => {
    const typeButton = getAllByText(type)[1] || getByText(type);
    fireEvent.click(typeButton);
    const typePokemon = getAllByText(type)[0];
    expect(typePokemon.innerHTML).toBe(type);
    const buttonType = getAllByText(type)[1];
    expect(buttonType.innerHTML).toBe(type);
    fireEvent.click(getByText(/Próximo pokémon/i));
  });
});

test('test 5.1, O texto do botão deve ser All;', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );

  const All = getByText(/All/i);
  expect(All).toBeInTheDocument();
});

test('test 5.2, Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons;', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );
  const All = getByText(/All/i);
  fireEvent.click(All);
  const nextPokemon = getByText(/Próximo pokémon/i);
  const pokemonName = document.getElementsByTagName('p')[0];
  for (let i = 0; i < pokemons.length; i += 1) {
    expect(pokemonName.innerHTML).toBe(pokemons[i].name);
    fireEvent.click(nextPokemon);
  }
});

test('test 5.3, Quando a página carrega, o filtro selecionado deve ser o All.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );
  const nextPokemon = getByText(/Próximo pokémon/i);
  const pokemonName = document.getElementsByTagName('p')[0];
  for (let i = 0; i < pokemons.length; i += 1) {
    expect(pokemonName.innerHTML).toBe(pokemons[i].name);
    fireEvent.click(nextPokemon);
  }
});

test('test 6, A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
  const { getByText, queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );
  const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];
  const All = getByText(/All/i);

  pokemonTypes.map((type) => {
    const pokemonButtonType = queryAllByText(type)[1] || getByText(type);
    expect(pokemonButtonType).toBeInTheDocument();
    expect(All).toBeInTheDocument();
  });
});

test('test 7, O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon ', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );
  const nextPokemon = getByText(/Próximo pokémon/i);
  const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];
  pokemonTypes.map((type) => {
    const pokemonButtonType = getAllByText(type)[1] || getByText(type);
    fireEvent.click(pokemonButtonType);
    const previousPokemonName = getByText(/Average weight:/i).previousSibling.previousSibling.textContent;
    fireEvent.click(nextPokemon);
    const currentPokemonName = getByText(/Average weight:/i).previousSibling.previousSibling.textContent;
    if (previousPokemonName === currentPokemonName) expect(nextPokemon).toBeDisabled();
    else expect(nextPokemon).toBeEnabled();
  });
});

test('test 8, A Pokedéx deve exibir o nome, tipo, peso médio e imagem do pokémon exibido', () => {
  const { getByText, getByAltText, queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    </MemoryRouter>,
  );

  pokemons.forEach((pokemon) => {
    const imageAlt = getByAltText(`${pokemon.name} sprite`);
    expect(imageAlt.src).toBe(pokemon.image);
    const type = queryAllByText(pokemon.type)[0];
    expect(type.tagName).toBe("P");
    expect(type).toBeInTheDocument();
    const nome = getByText(pokemon.name);
    expect(nome).toBeInTheDocument();
    const averageWeight = getByText(/Average weight:/i).textContent;
    const averageData = `Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`;
    expect(averageWeight).toBe(averageData);
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

test('test 9, O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
    </MemoryRouter>,
  );
  const nextPokemon = getByText(/Próximo pokémon/i);
  pokemons.forEach((pokemon) => {
    const buttonMoreDetails = getByText(/More details/i);
    expect(buttonMoreDetails.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
    fireEvent.click(nextPokemon);
  });
});

test('test 10, Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon', () => {
  const { getByText, history } = renderWithRouter(
    <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
  );
  const buttonMoreDetails = getByText(/More details/i);
  expect(buttonMoreDetails).toBeInTheDocument();
  expect(history.location.pathname).toBe('/');
  fireEvent.click(buttonMoreDetails);
  expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
});
const func = jest.fn();
test('test 11, A página de detalhes de pokémon deve exibir o nome, tipo, peso médio e imagem do pokémon exibido', () => {
  const pageDetails = (pokemon) => {
    const match = {
      params: {
        id: String(pokemon.id),
      },
    };
    const { getByText, getByAltText, queryAllByText} = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={func}
          isPokemonFavoriteById={isPokemonFavoriteById}
          match={match}
        />
      </MemoryRouter>,
    );
    const imageAlt = getByAltText(`${pokemon.name} sprite`);
    expect(imageAlt.src).toBe(pokemon.image);
    const type = queryAllByText(pokemon.type)[0];
    expect(type.tagName).toBe('P');
    expect(type).toBeInTheDocument();
    const nome = getByText(pokemon.name);
    expect(nome).toBeInTheDocument();
    const averageWeight = getByText(`Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
    expect(averageWeight).toBeInTheDocument();
  };

  pokemons.forEach((pokemon) => {
    pageDetails(pokemon);
  });
});

test('test 12, O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
  const pageDetails = (pokemon) => {
    const match = {
      params: {
        id: String(pokemon.id),
      },
    };
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={func}
          isPokemonFavoriteById={isPokemonFavoriteById}
          match={match}
        />
      </MemoryRouter>,
    );
    expect(queryByText(/More details/i)).toBeNull();
  };

  pokemons.forEach((pokemon) => {
    pageDetails(pokemon);
  });
});


describe('test 13, A página de detalhes deve exibir uma seção com um resumo do pokémon', () => {
  afterEach(cleanup);

  const summaryPokemon = (pokemon) => {
    const match = {
      params: {
        id: String(pokemon.id),
      },
    };

    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        onUpdateFavoritePokemons={func}
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
      />,
    );

    const summaryTitle = getByText(/Summary/i);
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryTitle.tagName).toBe('H2');

    const summaryText = getByText(`${pokemon.summary}`);
    expect(summaryText).toBeInTheDocument();
  };

  pokemons.forEach((pokemon) => {
    test(`13 case ${pokemon.name}`, () => {
      summaryPokemon(pokemon);
    });
  });
});
describe('test 14, O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
  afterEach(cleanup);
  const pageDetails = (pokemon) => {
    const match = {
      params: {
        id: String(pokemon.id),
      },
    };
    const { getByText, getAllByAltText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={func}
          isPokemonFavoriteById={isPokemonFavoriteById}
          match={match}
        />
      </MemoryRouter>,
    );
    const pokemonLocation = getByText(`Game Locations of ${pokemon.name}`);
    expect(pokemonLocation.tagName).toBe('H2');
    expect(pokemonLocation).toBeInTheDocument();
    expect(pokemonLocation.nextSibling.childNodes.length).toBe(pokemon.foundAt.length);

    pokemon.foundAt.forEach((tag, index) => {
      expect(getByText(tag.location)).toBeInTheDocument();
      const imageAlt = getAllByAltText(`${pokemon.name} location`);
      expect(imageAlt[index].src).toBe(tag.map);
      expect(imageAlt[index]).toBeInTheDocument();
    });
  };

  pokemons.forEach((pokemon) => {
    test(`14 case ${pokemon.name}`, () => {
      pageDetails(pokemon);
    });
  });
});

describe('test 15, A página de detalhes deve permitir favoritar um pokémon', () => {
  afterEach(cleanup);
  const pageDetails = (pokemon) => {
    const match = {
      params: {
        id: String(pokemon.id),
      },
    };

    const updateFavoritePokemons = jest.fn((array, id) => {
      array[id] = !array[id];
    });

    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={() => updateFavoritePokemons(isNotPokemonFavoriteById, pokemon.id)}
          isPokemonFavoriteById={isNotPokemonFavoriteById}
          match={match}
        />
      </MemoryRouter>,
    );
    const label = getByLabelText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
    const checked = true;
    fireEvent.click(label);
    expect(isNotPokemonFavoriteById[pokemon.id]).toBe(checked);
    fireEvent.click(label);
    expect(isNotPokemonFavoriteById[pokemon.id]).not.toBe(checked);
  };

  pokemons.forEach((pokemon) => {
    test(`15 case ${pokemon.name}`, () => {
      pageDetails(pokemon);
    });
  });
});

describe('test 16, Fokémons favoritados devem exibir um ícone de uma estrela', () => {
  afterEach(cleanup);

  test('16', () => {
    const { getByText, getByAltText, queryByAltText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    const nextPokemon = getByText(/Próximo pokémon/i);
    pokemons.forEach((starFavorite) => {
      if (isPokemonFavoriteById[starFavorite.id]) {
        const iconStar = getByAltText(`${starFavorite.name} is marked as favorite`);
        expect(iconStar).toBeInTheDocument();
        const starIcon = '/star-icon.svg'
        expect(iconStar.src).toBe(`http://localhost${starIcon}`);
      } else {
        expect(queryByAltText(`${starFavorite.name} is marked as favorite`)).not.toBeInTheDocument();
      }
      fireEvent.click(nextPokemon);
    });
  });
});

describe('test 17, No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  test('test 17', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByText(/Home/i);
    const linkAbout = getByText(/About/i);
    const linkFavoritePokémons = getByText(/Favorite Pokémons/i);
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokémons).toBeInTheDocument();
    expect(linkHome.href).toBe('http://localhost/');
    expect(linkAbout.href).toBe('http://localhost/about');
    expect(linkFavoritePokémons.href).toBe('http://localhost/favorites');
  });
});

describe('test 18, Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  test('test 18', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    expect(history.location.pathname).toBe('/');
    const buttonHome = getByText(/Home/i);
    fireEvent.click(buttonHome);
    expect(`http://localhost${history.location.pathname}`).toBe(buttonHome.href);
  });
});

describe('test 19, Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
  test('test 19', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    expect(history.location.pathname).toBe('/');
    const buttonAbout = getByText(/About/i);
    fireEvent.click(buttonAbout);
    expect(`http://localhost${history.location.pathname}`).toBe(buttonAbout.href);
  });
});

describe('test 20, Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
  test('test 20', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    expect(history.location.pathname).toBe('/');
    const buttonFavorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(buttonFavorite);
    expect(`http://localhost${history.location.pathname}`).toBe(buttonFavorite.href);
  });
});

describe('test 21, A página "About" deve exibir informações sobre a Pokédex', () => {
  test('test 21.1, A página deve conter um heading h2 com o texto About Pokédex;', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <About />
      </MemoryRouter>,
    );
    const aboutTitle = getByText(/About Pokédex/i);
    expect(aboutTitle).toBeInTheDocument();
    expect(aboutTitle.tagName).toBe('H2');
  });
  test('test 21.2, A página deve conter dois parágrafos com texto sobre a Pokédex;;', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <About />
      </MemoryRouter>,
    );
    const aboutTitle = getByText(/About Pokédex/i);
    const aboutParagraph = aboutTitle.nextSibling.childNodes;
    expect(aboutParagraph[0].tagName).toBe('P');
    expect(aboutParagraph[1].tagName).toBe('P');
  });
  test('test 21.3, A página deve conter a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <About />
      </MemoryRouter>,
    );
    const aboutTitle = getByText(/About Pokédex/i);
    const aboutParagraph = aboutTitle.nextSibling.childNodes;
    expect(aboutParagraph[2].src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});


describe('Test 22, A página de pokémon favoritos deve exibir os pokémons favoritos', () => {
  const testPossiblePoker = (poker, isFavoritePoker) => {
    const pokemonFavorited = poker.filter(({ id }) => isFavoritePoker[id]);
    const { getAllByText, queryByText, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <FavoritePokemons pokemons={pokemonFavorited} />
      </MemoryRouter>,
    );
    if (pokemonFavorited.length !== 0) {
      const listDetails = getAllByText('More details');
      expect(listDetails.length).toBe(pokemonFavorited.length);
      pokemonFavorited.forEach((pokemon) => {
        const name = getByText(pokemon.name);
        expect(name).toBeInTheDocument();
      });
    } else {
      expect(queryByText('More details')).not.toBeInTheDocument();
    }
  };
  test('test 22 ', () => {
    testPossiblePoker(pokemons, isPokemonFavoriteById);
  });
});

describe('test 23, Entrar em uma URL desconhecida exibe a página Not Found', () => {
  test('23.1 A página deve conter um heading h2 com o texto Page requested not found 😭;', () => {
    const { getByText } = renderWithRouter(<NotFound />, { route: '/4H0rase4damanhã' });
    const notfound = getByText(/Page requested not found/i)
    expect(notfound).toBeInTheDocument();
    expect(notfound.tagName).toBe('H2');
  });

  test('23.2 A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { getByAltText } = renderWithRouter(<NotFound />, { route: '/exaustrror' });

    const imagePageError = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imagePageError).toBeInTheDocument();
    expect(imagePageError.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

describe('test 25 and 26, Adicione uma rota para exibir uma lista de localizações', () => {
  test('25 and 26, ', () => {
    const { getByText, history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');
    const btnLocation = getByText(/Location/i);
    const location = btnLocation.href;
    fireEvent.click(btnLocation);
    expect(`http://localhost${history.location.pathname}`).toBe(location);
  });
});
describe('test 27, Adicione uma rota para exibir uma lista de localizações', () => {
  test('27, ', async () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Locations/i));
    await waitForDomChange();
    const elementP = queryAllByTestId('location-name');
    expect(elementP.length).toBe(100);
    const previousButton = getByText(/Previous/i);
    expect(previousButton).toBeDisabled();
    for (let index = 0; index < 7; index += 1) {
      const nextButton = getByText(/Next/i);
      fireEvent.click(nextButton);
    }
    const nextButton = getByText(/Next/i);
    expect(nextButton).toBeNull();
  });
});
describe('test 28 and 29, Adicione uma rota para exibir uma lista de localizações', () => {
  test('28 and 29,', async () => {
    const { getByText, history, getAllByText } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');
    const btnGenerations = getByText(/Generations/i);
    fireEvent.click(btnGenerations);
    expect(`http://localhost${history.location.pathname}`).toBe('http://localhost/generations');
    await waitForDomChange();
    const generation1 = getAllByText(/generation-i/i);
    const generation2 = getAllByText(/generation-v/i);

    expect(generation1[0]).toBeInTheDocument();
    expect(generation1[1]).toBeInTheDocument();
    expect(generation1[2]).toBeInTheDocument();
    expect(generation1[3]).toBeInTheDocument();
    expect(generation2[0]).toBeInTheDocument();
    expect(generation2[1]).toBeInTheDocument();
    expect(generation2[2]).toBeInTheDocument();
  });
});

describe('test 30, Adicione uma rota para exibir uma lista de localizações', () => {
  test('Testar a quantidade de item na tela sendo renderizado', async () => {
    const { getByText, history, getAllByText } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');
    const btnGenerations = getByText(/Generations/i);
    fireEvent.click(btnGenerations);
    fireEvent.click(btnGenerations);
    expect(`http://localhost${history.location.pathname}`).toBe('http://localhost/generations');
    await waitForDomChange();
    const btnGenerationsY = getAllByText(/generation-i/i);
    fireEvent.click(btnGenerationsY[0]);
    expect(`http://localhost${history.location.pathname}`).toBe('http://localhost/generations/1');
  });
});


describe('test 31, Adicione uma rota para exibir uma lista de localizações', () => {
  test('Testar a quantidade de item na tela sendo renderizado', async () => {
    const { queryAllByTestId, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Generations/i));
    await waitForDomChange();
    const elementDiv = queryAllByTestId('element-div');
    expect(elementDiv.length).toBe(7);
  });
});
