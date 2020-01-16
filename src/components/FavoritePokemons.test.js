import React from "react";
import FavoritePokemons from "./FavoritePokemons";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  render,
  fireEvent,
  cleanup,
  getByAltText,
  getAllByText
} from "@testing-library/react";

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
  4: true,
  10: false,
  23: true,
  78: false
};

const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);

describe("22 - A página de pokémon favoritos deve exibir os pokémons favoritos", () => {
  test("A página deve exibir todos os pokémons favoritados;", () => {
    const { getByText, getByAltText, getAllByText } = render(
      <MemoryRouter>
        <FavoritePokemons pokemons={favoritePokemons} />
      </MemoryRouter>
    );

    if (favoritePokemons.length === 0) {
      expect(getByText("No favorite pokemon found")).toBeInTheDocument();
    } else {
      favoritePokemons.forEach(pokemon => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        expect(
          getByText(
            `Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`
          )
        ).toBeInTheDocument();
        expect(getByAltText(`${pokemon.name} sprite`).src).toBe(pokemon.image);
      });
    }
  });

  test("A página não deve exibir nenhum pokémon não favoritado.", () => {});
});
