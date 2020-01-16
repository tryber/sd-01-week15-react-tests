import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from "@testing-library/react";
import Pokedex from "./Pokedex";

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

const isPokemonFavoriteById = {
  4: false,
  10: true,
  23: false,
  78: true
};

const pokemons = [
  {
    id: 4,
    name: "Charmander",
    type: "Fire",
    averageWeight: {
      value: "8.5",
      measurementUnit: "kg"
    },
    image: "https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png",
    moreInfo:
      "https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)",
    foundAt: [
      {
        location: "Alola Route 3",
        map: "https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png"
      },
      {
        location: "Kanto Route 3",
        map: "https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png"
      },
      {
        location: "Kanto Route 4",
        map: "https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png"
      },
      {
        location: "Kanto Rock Tunnel",
        map: "https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png"
      }
    ],
    summary:
      "The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly."
  },
  {
    id: 10,
    name: "Caterpie",
    type: "Bug",
    averageWeight: {
      value: "2.9",
      measurementUnit: "kg"
    },
    image: "https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png",
    moreInfo: "https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)",
    foundAt: [
      {
        location: "Johto Route 30",
        map: "https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png"
      },
      {
        location: "Johto Route 31",
        map: "https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png"
      },
      {
        location: "Ilex Forest",
        map: "https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png"
      },
      {
        location: "Johto National Park",
        map:
          "https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png"
      }
    ],
    summary:
      "For protection, it releases a horrible stench from the antennae on its head to drive away enemies."
  },
  {
    id: 23,
    name: "Ekans",
    type: "Poison",
    averageWeight: {
      value: "6.9",
      measurementUnit: "kg"
    },
    image: "https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png",
    moreInfo: "https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)",
    foundAt: [
      {
        location: "Goldenrod Game Corner",
        map:
          "https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png"
      }
    ],
    summary:
      "It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however."
  },
  {
    id: 78,
    name: "Rapidash",
    type: "Fire",
    averageWeight: {
      value: "95.0",
      measurementUnit: "kg"
    },
    image: "https://cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png",
    moreInfo: "https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)",
    foundAt: [
      {
        location: "Kanto Route 28",
        map: "https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png"
      },
      {
        location: "Johto Mount Silver",
        map: "https://cdn.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png"
      }
    ],
    summary:
      "At full gallop, its four hooves barely touch the ground because it moves so incredibly fast."
  }
];

describe("Requisito 2, A Pokédex deve exibir apenas um pokémon por vez", () => {
  test("Pokédex should only display one Pokémon at a time.", () => {
    const { getAllByText, getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );
    pokemons.forEach(() => {
      fireEvent.click(getByText("Próximo pokémon"));
      const pokemoncont = getAllByText(/More details/i).length;
      expect(pokemoncont).toBe(1);
    });
  });
});

describe("Requisito 3, Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista", () => {
  afterEach(cleanup);
  test("O botão deve conter o texto Próximo pokémon;", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );
    const buttonNext = getByText("Próximo pokémon");
    expect(buttonNext).toBeInTheDocument();
  });

  test("Cliques sucessivos no botão devem mostrar o próximo pokémon da lista", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );
    const buttonNext = getByText("Próximo pokémon");
    const pokemonNames = pokemons.map(pokemon => pokemon.name);
    const arrayOfNameValidation = [];
    for (let index = 0; index < pokemons.length; index += 1) {
      arrayOfNameValidation.push(pokemons[index].name);
      fireEvent.click(buttonNext);
    }
    expect(pokemonNames).toStrictEqual(arrayOfNameValidation);
  });

  test("Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );
    const buttonNext = getByText("Próximo pokémon");
    const details = getByText("More details");
    let nameOfPokemon;
    const firstPokemon = pokemons[0].name;
    for (let i = 0; i < pokemons.length; i += 1) {
      fireEvent.click(buttonNext);
      nameOfPokemon =
        details.previousSibling.previousSibling.previousSibling.innerHTML;
    }
    expect(nameOfPokemon).toStrictEqual(firstPokemon);
  });
});

describe("Requisito 4, A Pokédex deve conter botões de filtro", () => {
  afterEach(cleanup);
  test("A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo", () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );
    const allPokemonTypes = [...new Set(pokemons.map(pokemon => pokemon.type))];
    const nextPokemon = getByText("Próximo pokémon");
    const details = getByText("More details");

    for (let i = 0; i < allPokemonTypes.length; i += 1) {
      const actualType =
        getAllByText(allPokemonTypes[i])[1] || getByText(allPokemonTypes[i]);
      expect(actualType).toBeInTheDocument();
      fireEvent.click(actualType);
      fireEvent.click(nextPokemon);
      expect(details.previousSibling.previousSibling.innerHTML).toBe(
        actualType.innerHTML
      );
    }
  });
});

describe("Requisito 5, A Pokédex deve conter um botão para resetar o filtro", () => {
  test("O texto do botão deve ser All", () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );

    const buttonAll = getByText("All");
    expect(buttonAll).toBeInTheDocument();
  });

  test("Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );
    const buttonAll = getByText("All");
    const buttonNextPokemon = getByText("Próximo pokémon");
    const pokemonsToValidate = [];
    fireEvent.click(buttonAll);

    for (let i = 0; i < pokemons.length; i += 1) {
      pokemonsToValidate.push(pokemons[i]);
      fireEvent.click(buttonNextPokemon);
    }
    expect(pokemonsToValidate).toStrictEqual(pokemons);
  });

  test("Quando a página carrega, o filtro selecionado deve ser o All", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );
    const buttonNextPokemon = getByText("Próximo pokémon");
    const pokemonsToValidate = [];

    for (let i = 0; i < pokemons.length; i += 1) {
      pokemonsToValidate.push(pokemons[i]);
      fireEvent.click(buttonNextPokemon);
    }
    expect(pokemonsToValidate).toStrictEqual(pokemons);
  });
});

describe("A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon", () => {
  test("Os botões de filtragem devem ser dinâmicos:", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );

    const pokemonTypes = [...new Set(pokemons.map(pokemon => pokemon.type))];
    const buttonAll = getByText("All");
    let buttonAux = buttonAll;
    const arrayOfTypes = [];
    for (let i = 0; i < pokemonTypes.length; i += 1) {
      arrayOfTypes.push(buttonAux.nextSibling.textContent);
      buttonAux = buttonAux.nextSibling;
    }
    expect(arrayOfTypes).toStrictEqual(pokemonTypes);
  });
});

describe("7 - O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon", () => {
  test("testando se o botão está desabilitado", () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );

    const pokemonTypes = [...new Set(pokemons.map(pokemon => pokemon.type))];
    const nextButton = getByText(/Próximo pokémon/);

    pokemonTypes.forEach(type => {
      const button = getAllByText(type)[1] || getByText(type);
      fireEvent.click(button);
      const actualName = getByText(/Average weight:/i).previousSibling
        .previousSibling.textContent;
      fireEvent.click(nextButton);
      const nextName = getByText(/Average weight:/i).previousSibling
        .previousSibling.textContent;
      if (actualName === nextName) {
        expect(nextButton.disabled).toBe(true);
      } else {
        expect(nextButton.disabled).toBe(false);
      }
    });
  });
});

describe("8 - A Pokedéx deve exibir o nome, tipo, peso médio e imagem do pokémon exibido", () => {
  test(" peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida;", () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );
    const nextButton = getByText('Próximo pokémon');
    for (let i = 0; i < pokemons.length; i += 1) {
      const moreDetails = getByText('More details').previousSibling.innerHTML;
      const format = `Average weight: ${pokemons[i].averageWeight.value} ${pokemons[i].averageWeight.measurementUnit}`;
      expect(moreDetails).toBe(format);
      fireEvent.click(nextButton);
    }
  });

  test('A imagem deve conter um atributo src com a URL da imagem do pokémon. A imagem deverá ter também um atributo alt com o nome do pokémon.', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );
    const nextButton = getByText('Próximo pokémon');
    for (let i = 0; i < pokemons.length; i += 1) {
      const imgAlt = getByAltText(`${pokemons[i].name} sprite`);
      expect(imgAlt.src).toBe(pokemons[i].image);
      expect(imgAlt.alt).toBe(`${pokemons[i].name} sprite`);
      fireEvent.click(nextButton);
    }
  })
});

describe('9 - O pokémon exibido na Pokedéx deve conter um link de navegação para exibir detalhes deste pokémon', () => {
  test('O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={pokemons}
          isPokemonFavoriteById={isPokemonFavoriteById}
        />
      </MemoryRouter>
    );

    const nextButton = getByText('Próximo pokémon');
    for (let i = 0; i < pokemons.length; i += 1) {
      const moreDetails = getByText('More details').href;
      expect(moreDetails).toBe(`http://localhost/pokemons/${pokemons[i].id}`);
      fireEvent.click(nextButton);
    }
  })
})

describe('10,  Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon', () => {
  test('A URL exibida no navegador deve mudar para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver.', () => {
    const { history, getByRole, getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
    );
    
    expect(history.location.pathname).toBe('/');
      const link = getByRole('link');
      fireEvent.click(link);
      expect(`http://localhost/pokemons${history.location.pathname}`).toBe(link.href);
  });
});

