
import React from 'react';
import { render, cleanup, fireEvent, queryByAltText } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Generations from './Generations';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

afterEach(cleanup);

describe('Generations page test suite', () => {
  function fetchPokeGenerations() {
    const resultsList = fetch('https://pokeapi.co/api/v2/generations/')
      .then((response) => response.json())
      .then(({ results }) => results.map(({ name, url }) => [name, url]));

    // enable to check results list from fetch
    // console.log(resultsList);
    return resultsList;
  }

  it('28.2 - the page must exhibit a list with the returned locations', () => {
    const { container } = renderWithRouter(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const generationsList = container.querySelectorAll('li');
    const generations = fetchPokeGenerations();

    generationsList.forEach((listItem) => generations.forEach(([name, url]) => (
      expect(listItem).toEqual(expect.arrayContaining(name, url)))));
  });

  it('30.2 - the generations/id page should exhibit a list with pokemons and their urls', () => {
    function fetchIdGenPokes() {
      const resultsList = fetch(URL)
        .then((response) => response.json())
        .then(({ pokemon_species }) => (
          pokemon_species.map(({ name, url }) => (
            this.setState((state) => ({ table: [...state.table, [name, url]] }))))));

      return resultsList;
    }

    const XGenPokes = fetchIdGenPokes();
    const randomGen = Math.floor(Math.random() * XGenPokes.length);

    const { container } = renderWithRouter(
      <MemoryRouter initialEntries={[`/generations/${randomGen}`]}>
        <App />
      </MemoryRouter>,
    );

    const pokesList = container.querySelectorAll('li');

    pokesList.forEach((listItem) => XGenPokes.forEach(([name, url]) => (
      expect(listItem).toEqual(expect.arrayContaining(name, url)))));
  });
});
