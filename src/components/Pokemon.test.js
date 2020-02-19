import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import Pokemon from './Pokemon';

const pokemon = {
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
};

const isFavorite = true;

describe('Pokemon component test suite', () => {
  it('8 - poke characteristics', () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <Pokemon pokemon={pokemon} isFavorite={isFavorite} />
      </MemoryRouter>,
    );

    const { averageWeight: { measurementUnit, value } } = pokemon;
    const avgWeight = getByText(/Average weight/i);
    expect(avgWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

    // Second pre-requisite of the test: images
    const pokeImg = container.querySelector('img');
    expect(pokeImg).toHaveProperty('src', pokemon.image);
    expect(pokeImg).toHaveProperty('alt', `${pokemon.name} sprite`);
  });

  it('9 - poke url', () => {
    const { container } = render(
      <MemoryRouter>
        <Pokemon pokemon={pokemon} isFavorite={isFavorite} />
      </MemoryRouter>,
    );
    const url = container.getElementsByTagName('a');
    expect(Array(url).some((link) => link[0].href.includes(pokemon.id))).toBeTruthy();
  });

  afterEach(cleanup);
});
