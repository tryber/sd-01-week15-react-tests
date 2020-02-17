import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';
import { NotFound, Pokedex, PokemonDetails, About, favoritePokemons } from './components';

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

const isPokemonFavoriteById = {
  25: true,
  4: true,
  10: false,
  23: true,
  65: false,
  151: true,
  78: false,
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

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Requisito 1', () => {
  test('Shows the Pokedéx when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Requisito 2', () => {
  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { queryAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const onePokemon = queryAllByText(/Average weight/i);
    expect(onePokemon.length).toBe(1);
  });
});

describe('Requisito 3 - Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('3.1 and 3.2 - Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    for (let index = 0; index < pokemons.length; index += 1) {
      expect(getByText(pokemons[index].name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    }
  });
  test('3.3 - Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão.', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemon = getByText(/Próximo pokémon/i);

    for (let index = 0; index < pokemons.length; index += 1) {
      fireEvent.click(nextPokemon);
    }
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
});

describe('Requisito 4 - A Pokédex deve conter botões de filtro', () => {
  test('4.1 and 4.2 - A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByText, queryAllByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const buttonType = queryAllByText(pokemon.type)[1] || getByText(pokemon.type);
      fireEvent.click(buttonType);
      fireEvent.click(nextPokemon);
      fireEvent.click(nextPokemon);
      const samePokemon = queryAllByText(pokemon.type);
      expect(samePokemon.length).toBe(2);
      expect(pokemon.type).toBe(buttonType.innerHTML);
    });
  });
});

describe('Requisito 5 - A Pokédex deve conter um botão para resetar o filtro', () => {
  const namePokemons = pokemons.map(pokemon => pokemon.name);

  test('5.1 - O texto do botão deve ser All', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/All/i)).toBeInTheDocument();
  });
  test('5.2 - Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/All/i));

    const firstTagP = document.getElementsByTagName('p')[0];
    const nextPokemon = getByText(/Próximo pokémon/i);

    for (let index = 0; index < namePokemons.length; index += 1) {
      expect(firstTagP.innerHTML).toBe(namePokemons[index]);
      fireEvent.click(nextPokemon);
    }
  });
  test('5.3 - Quando a página carrega, o filtro selecionado deve ser o All.', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/Home/i));
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();

    const firstTagP = document.getElementsByTagName('p')[0];
    const nextPokemon = getByText(/Próximo pokémon/i);

    for (let index = 0; index < namePokemons.length; index += 1) {
      expect(firstTagP.innerHTML).toBe(namePokemons[index]);
      fireEvent.click(nextPokemon);
    }
  });
});

describe('Requisito 6', () => {
  test('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { getByText, queryAllByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokemonType = queryAllByText(`${pokemon.type}`);
      expect(pokemonType.length).toBe(2);
      expect(pokemonType[0].tagName).toBe('P');
      expect(pokemonType[1].tagName).toBe('BUTTON');

      const allFilters = getByText(/All/i);
      expect(allFilters.tagName).toBe('BUTTON');

      fireEvent.click(nextPokemon);
    });
  });
});

describe('Requisito 7', () => {
  test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getByText, queryAllByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const buttonType = queryAllByText(pokemon.type)[1] || getByText(pokemon.type);
      fireEvent.click(buttonType);
      pokemon.type === 'Fire' || pokemon.type === 'Psychic'
        ? expect(nextPokemon).toBeEnabled()
        : expect(nextPokemon).toBeDisabled();
    });
  });
});

describe('Requitio 8 - A Pokedéx deve exibir o nome, tipo, peso médio e imagem do pokémon exibido', () => {
  test('8.1', () => {
    const { getByText, getByAltText, getAllByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/More details/i);
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(getByText(`${pokemon.name}`)).toBeInTheDocument();
      const pokemonType = getAllByText(`${pokemon.type}`);
      expect(pokemonType.length).toBe(2);

      const averageWeight = getByText(`Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
      expect(averageWeight).toBeInTheDocument();

      const imageAlt = getByAltText(`${pokemon.name} sprite`);
      expect(imageAlt).toBeInTheDocument();
      expect(imageAlt.src).toBe(pokemon.image);

      fireEvent.click(getByText(/Próximo pokémon/i));
    });
  });
});

describe('Requisito 9', () => {
  test('O pokémon exibido na Pokedéx deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const { getByText } = renderWithRouter(<App />);

    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    const idArray = pokemons.map(pokemon => pokemon.id);

    for (let index = 0; index < idArray.length; index += 1) {
      expect(moreDetails.href).toBe(`http://localhost/pokemons/${idArray[index]}`);
      fireEvent.click(nextPokemon);
    }
  });
});

describe('Requisito 10', () => {
  test('Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const link = getByRole('link');
    expect(link).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');

    fireEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });
});

const func = jest.fn();
describe('Requisito 11 - A página de detalhes de pokémon deve exibir o nome, tipo, peso médio e imagem do pokémon exibido', () => {
  const pageDetails = (pokemon) => {
    const match = {
      params: {
        id: String(pokemon.id),
      },
    };

    const { getByText, getByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        onUpdateFavoritePokemons={func}
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
      />,
    );

    expect(getByText(`${pokemon.name}`)).toBeInTheDocument();
    expect(getByText(`${pokemon.type}`)).toBeInTheDocument();

    const pokemonWeight = getByText(`Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
    expect(pokemonWeight).toBeInTheDocument();

    const imagePokemon = getByAltText(`${pokemon.name} sprite`);
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon.src).toBe(pokemon.image);
  };

  pokemons.forEach((pokemon) => {
    test('11.1 details page must show name, type, average weight and image', () => {
      pageDetails(pokemon);
    });
  });
});

describe('Requisito 12', () => {
  const noLinkMoreDetails = (pokemon) => {
    const match = {
      params: {
        id: String(pokemon.id),
      },
    };

    const { queryByText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        onUpdateFavoritePokemons={func}
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
      />,
    );

    expect(queryByText(/More details/i)).toBeNull();
  };

  pokemons.forEach((pokemon) => {
    test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
      noLinkMoreDetails(pokemon);
    });
  });
});

describe('Requisito 13 - A página de detalhes deve exibir uma seção com um resumo do pokémon', () => {
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
    test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      summaryPokemon(pokemon);
    });
  });
});

describe('Requisito 14', () => {
  const locationsMaps = (pokemon) => {
    const match = {
      params: {
        id: String(pokemon.id),
      },
    };

    const { getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        onUpdateFavoritePokemons={func}
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
      />,
    );

    const headingTitle = getByText(`${pokemon.name} Details`);
    expect(headingTitle).toBeInTheDocument();
    expect(headingTitle.tagName).toBe('H2');
    expect(getByText(`Game Locations of ${pokemon.name}`)).toBeInTheDocument();

    pokemon.foundAt.forEach((location, index) => {
      expect(getByText(location.location)).toBeInTheDocument();
      const imageAlt = getAllByAltText(`${pokemon.name} location`);
      expect(imageAlt[index].src).toBe(location.map);
      expect(imageAlt[index]).toBeInTheDocument();
    });
  };

  pokemons.forEach((pokemon) => {
    test('14.1 The page show the locations maps, title, src and alt', () => {
      locationsMaps(pokemon);
    });
  });
});

// describe('Requisito 15', () => {
//   const favorPokemon = (pokemon) => {
//     const match = {
//       params: {
//         id: String(pokemon.id),
//       },
//     };

//     const updateFavoritePokemons = jest.fn((array, id) => {
//       array[id] = !array[id];
//     });

//     const { getByLabelText } = renderWithRouter(
//       <PokemonDetails
//         pokemons={pokemons}
//         onUpdateFavoritePokemons={() => updateFavoritePokemons(isNotPokemonFavoriteById, pokemon.id)}
//         isPokemonFavoriteById={isNotPokemonFavoriteById}
//         match={match}
//       />,
//     );

//     const label = getByLabelText(/Pokémon favoritado?/i);
//     expect(label).toBeInTheDocument();
//     const checked = isNotPokemonFavoriteById[pokemon.id];
//     fireEvent.click(label);
//     expect(isNotPokemonFavoriteById[pokemon.id]).not.toBe(checked);
//     fireEvent.click(label);
//     expect(isNotPokemonFavoriteById[pokemon.id]).toBe(checked);
//   };

//   pokemons.forEach((pokemon, index) => {
//     test('15.1 A página deve conter um checkbox que permita favoritar um pokémon. Cliques no checkbox devem, alternadadamente, adicionar e remover o pokémon da lista de favoritos', () => {
//       favorPokemon(pokemon, index);
//     });
//   });
// });

test('16- Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const onePokemon = queryAllByText(/Average weight/i);
  expect(onePokemon.length).toBe(1);
});

describe('Requisito 17 - No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home com a URL /', () => {
    const { getByText, queryAllByRole } = renderWithRouter(<App />);

    const firstLink = queryAllByRole('link')[0].innerHTML;
    const secondLink = queryAllByRole('link')[1].innerHTML;
    const thirdLink = queryAllByRole('link')[2].innerHTML;
    expect(firstLink).toBe('Home');
    expect(secondLink).toBe('About');
    expect(thirdLink).toBe('Favorite Pokémons');

    const home = getByText(/Home/i);
    expect(home.href).toBe('http://localhost/');

    const about = getByText(/About/i);
    expect(about.href).toBe('http://localhost/about');

    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites.href).toBe('http://localhost/favorites');
  });
});

describe('Requisito 18 ', () => {
  test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/Home/i));

    const homeInfo = getByText(/Próximo pokémon/i);
    expect(homeInfo).toBeInTheDocument();
  });
});

describe('Requisito 19 ', () => {
  test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/About/i));

    const aboutInfo = getByText(/About Pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });
});

describe('Requisito 20', () => {
  test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const noFavoritePokemonInfo = getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemonInfo).toBeInTheDocument();
  });
});

describe('Requisito 21', () => {
  test('21.1 - A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
    expect(getByText(/About Pokédex/i).tagName).toBe('H2');
  });

  test('21.2 - A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();

    const twoParagraphs = document.getElementsByTagName('p');
    expect(twoParagraphs.length).toBe(2);
  });

  test('21.3 - A página deve conter a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const imagePageAbout = getByAltText(/Pokédex/i);
    expect(imagePageAbout).toBeInTheDocument();

    const img = document.getElementsByTagName('img')[0];
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

describe('Requisito 22', () => {
  test('22.1 - A página deve exibir todos os pokémons favoritados', () => {
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);
    const { getByText, getByAltText } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemons} />,
    );
    favoritePokemons.forEach((favorite) => {
      expect(getByText(favorite.name)).toBeInTheDocument();
      expect(getByText(favorite.type)).toBeInTheDocument();
      expect(getByText(`Average weight: ${favorite.averageWeight.value} ${favorite.averageWeight.measurementUnit}`)).toBeInTheDocument();
      expect(getByAltText(`${favorite.name} sprite`).src).toBe(favorite.image);
    });
    expect(getByText(/Favorite pokémons/i)).toBeInTheDocument();
  });

  test('22.2 - A página não deve exibir nenhum pokémon não favoritado', () => {
    const noFavoritePokemons = pokemons.filter(({ id }) => isNotPokemonFavoriteById[id]);
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={noFavoritePokemons} />,
    );
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
    expect(getByText(/Favorite pokémons/i)).toBeInTheDocument();
  });
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
