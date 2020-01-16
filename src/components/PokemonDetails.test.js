import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  render,
  fireEvent,
  cleanup,
  getAllByText
} from "@testing-library/react";
import PokemonDetails from "./PokemonDetails";

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

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

const isPokemonFavoriteById = {
  4: false,
  10: true,
  23: false,
  78: true
};

describe("11, A página de detalhes do pokémon deve exibir o nome, tipo, peso médio e imagem do pokémon exibido", () => {
  test("O peso médio do pokémon deve ser exibido com um texto no formato `Average weight: <value> <measurementUnit>`, onde `<value>` e `<measurementUnit>` são, respectivamente, o peso médio do pokémon e sua unidade de medida. A imagem deve conter um atributo `src` com a URL da imagem do pokémon. A imagem deverá ter também um atributo `alt` com o nome do pokémon.", () => {
    const func = jest.fn();
    pokemons.forEach(pokemon => {
      const match = {
        params: {
          id: `${pokemon.id}`
        }
      };
      const { getByText, getByAltText } = render(
        <MemoryRouter initialEntries={["/"]}>
          <PokemonDetails
            pokemons={pokemons}
            onUpdateFavoritePokemons={func}
            isPokemonFavoriteById={isPokemonFavoriteById}
            match={match}
          />
        </MemoryRouter>
      );
      const pokemonWeight = getByText(
        `Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`
      );
      const pokemonImage = getByAltText(`${pokemon.name} sprite`);

      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonImage.src).toBe(pokemon.image);
    });
  });
});

describe("12 - O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon", () => {
  test("verificando se não há link para mais detalhes", () => {
    const func = jest.fn();
    pokemons.forEach(pokemon => {
      const match = {
        params: {
          id: `${pokemon.id}`
        }
      };
      const { queryByRole } = renderWithRouter(
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={func}
          isPokemonFavoriteById={isPokemonFavoriteById}
          match={match}
        />
      );
      expect(queryByRole("link")).toBeNull();
    });
  });
});

describe("13 - A página de detalhes deve exibir uma seção com um resumo do pokémon", () => {
  function ex13(pokemon) {
    const func = jest.fn();
    const match = {
      params: {
        id: `${pokemon.id}`
      }
    };
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={func}
          isPokemonFavoriteById={isPokemonFavoriteById}
          match={match}
        />
      </MemoryRouter>
    );
    const summaryText = getByText("Summary");
    const summaryParagraph = getByText(pokemon.summary);
    expect(summaryText).toBeInTheDocument();
    expect(summaryText.tagName).toBe("H2");
    expect(summaryParagraph).toBeInTheDocument();
    expect(summaryParagraph.tagName).toBe("P");
  }
  test("A seção de detalhes deve conter um heading `h2` com o texto `Summary` e o conteúdo do parágrafo com o resumo específico, testando o primeiro pokemon", () => {
    ex13(pokemons[0]);
  });
  test("A seção de detalhes deve conter um heading `h2` com o texto `Summary` e o conteúdo do parágrafo com o resumo específico, testando o segundo pokemon", () => {
    ex13(pokemons[1]);
  });
  test("A seção de detalhes deve conter um heading `h2` com o texto `Summary` e o conteúdo do parágrafo com o resumo específico, testando o terceiro pokemon", () => {
    ex13(pokemons[2]);
  });
  test("A seção de detalhes deve conter um heading `h2` com o texto `Summary` e o conteúdo do parágrafo com o resumo específico, testando o quarto pokemon", () => {
    ex13(pokemons[3]);
  });
});

describe("14 - A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon", () => {
  function ex14(pokemon) {
    const func = jest.fn();
    const match = {
      params: {
        id: `${pokemon.id}`
      }
    };
    const { getByText, queryAllByAltText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={func}
          isPokemonFavoriteById={isPokemonFavoriteById}
          match={match}
        />
      </MemoryRouter>
    );
    const headingText = getByText(`Game Locations of ${pokemon.name}`);
    expect(headingText).toBeInTheDocument();
    expect(headingText.tagName).toBe("H2");
    expect(headingText.nextSibling.childNodes.length).toBe(
      pokemon.foundAt.length
    );

    pokemon.foundAt.forEach((location, index) => {
      expect(getByText(location.location)).toBeInTheDocument();
      const allImages = queryAllByAltText(`${pokemon.name} location`);
      expect(allImages[index].src).toBe(location.map);
      expect(allImages[index].alt).toBe(`${pokemon.name} location`);
    });
  }

  test("testando lista de pokemons", () => {
    pokemons.forEach(pokemon => ex14(pokemon));
  });
});

describe("15 - A página de detalhes deve permitir favoritar um pokémon", () => {
  function ex15(pokemon) {
    const match = {
      params: {
        id: `${pokemon.id}`,
      },
    };
    const updateFavoritePokemons = jest.fn((array, id) => {
      array[id] = !array[id];
    });
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={() => updateFavoritePokemons(isPokemonFavoriteById, pokemon.id)}
          isPokemonFavoriteById={isPokemonFavoriteById}
          match={match}
        />
      </MemoryRouter>,
    );
    const checkbox = getByLabelText(/Pokémon favoritado?/i);
    expect(getByLabelText(/Pokémon favoritado?/i)).toBeInTheDocument();
    const isChecked = isPokemonFavoriteById[pokemon.id];
    fireEvent.click(checkbox);
    expect(isChecked).not.toBe(isPokemonFavoriteById[pokemon.id]);
  }

  pokemons.forEach((pokemon) => (
    test(`case ${pokemon.name}`, () => {
      ex15(pokemon);
    })
  ));
});

describe('16 - Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  function ex16(pokemon) {
    const func = jest.fn();
    const match = {
      params: {
        id: `${pokemon.id}`,
      },
    };
    const { getByAltText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonDetails
          pokemons={pokemons}
          onUpdateFavoritePokemons={func}
          isPokemonFavoriteById={isPokemonFavoriteById}
          match={match}
        />
      </MemoryRouter>,
    );
    if (isPokemonFavoriteById[pokemon.id]) {
      const starIcon = getByAltText(`${pokemon.name} is marked as favorite`);
      expect(starIcon).toBeInTheDocument();
      expect(starIcon.alt).toBe(`${pokemon.name} is marked as favorite`);
      expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    }
  }
  pokemons.forEach((pokemon) => (
    test(`case ${pokemon.name}`, () => {
      ex16(pokemon);
    })
  ));
})
