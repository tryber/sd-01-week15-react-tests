import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Pokedex from "./Pokedex";

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
  // const { getByText } = render(
  //   <MemoryRouter>
  //     <Pokedex
  //       pokemons={pokemons}
  //       isPokemonFavoriteById={isPokemonFavoriteById}
  //     />
  //   </MemoryRouter>
  // );

  test("A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo", () => {});
  test("O texto do botão deve ser o nome do tipo, p. ex. Psychic.", () => {});
});
