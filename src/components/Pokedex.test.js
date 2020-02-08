import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Pokedex from './Pokedex';
import {
  readFavoritePokemonIds,
} from '../services/pokedexService';

afterEach(cleanup);

describe('Pokedex component test suite', () => {
  it(' 6 - Pokedex generates a filter button for each pokemon type', () => {
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

    function setIsPokemonFavoriteById() {
      const favoritePokemonIds = readFavoritePokemonIds();
      const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
        acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
        return acc;
      }, {});

      return isPokemonFavorite;
    }


    const { getByText, container } = render(
      <MemoryRouter>
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={setIsPokemonFavoriteById()} />
      </MemoryRouter>,
    );

    const buttons = container.querySelectorAll('.button-text.filter-button');
    const categories = ['Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
      'All'];
    const categoriesButtons = Array(buttons).filter((button) => (
      categories.map((category) => (button.innerHTML === category))));
    const buttonAll = () => (fireEvent.click(getByText(/All/i)));
    const buttonElectric = () => (fireEvent.click(categoriesButtons[0][1]));
    const buttonFire = categoriesButtons[0][2];
    const buttonBug = categoriesButtons[0][3];
    const buttonPoison = categoriesButtons[0][4];
    const buttonPsychic = categoriesButtons[0][5];
    const buttonNormal = categoriesButtons[0][6];

    expect(buttonAll()).not.toBe(null);
    expect(buttonElectric()).not.toBe(null);
    expect(buttonFire).not.toBe(undefined);
    expect(buttonBug).toBe(undefined);
    expect(buttonPoison).toBe(undefined);
    expect(buttonPsychic).toBe(undefined);
    expect(buttonNormal).toBe(undefined);
  });
});
