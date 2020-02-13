
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
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
  async function fetchPokeGenerations() {
    const resultsList = await fetch('https://pokeapi.co/api/v2/generation/')
      .then((response) => response.json())
      .then(({ results }) => results.map(({ name, url }) => [name, url]));

    // enable to check results list from fetch
    // console.log(resultsList);
    return resultsList;
  }

  it('28.2 - the page must exhibit a list with the returned locations', async () => {
    const { getByText, queryAllByText } = renderWithRouter(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const genButton = getByText(/Generations/i);
    fireEvent.click(genButton);
    const generationsList = queryAllByText(/generations/gm);
    const generations = fetchPokeGenerations();

    console.log(generationsList);

    generationsList.forEach((listItem) => generations.forEach(([name, url]) => (
      expect(listItem).toEqual(expect.arrayContaining(name, 'oi')))));
  });


  it.skip('30.2 - the generations/id page should exhibit a list with pokemons and their urls', async () => {
    const randomNum = Math.floor((Math.random() * 7) + 1);
    async function fetchPokebyGeneration() {
      const resultsList = await fetch(`https://pokeapi.co/api/v2/generation/${randomNum}`)
        .then((response) => response.json())
        .then(({ pokemon_species }) => pokemon_species.map(({ name, url }) => [name, url]));

      // enable to check results list from fetch
      // console.log(resultsList);
      return resultsList;
    }

    const { container, getByText } = renderWithRouter(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const isGen = getByText(/Name:generation/i);
    expect(isGen).toBeInTheDocument();

    const pokesList = container.querySelectorAll('li');
    const XGenPokes = await fetchPokebyGeneration();

    // console.log(XGenPokes);

    pokesList.forEach((listItem) => XGenPokes.forEach(([name, url]) => (
      expect(listItem).toEqual(expect.arrayContaining(name, url)))));
  });

  it.skip('31 - each generation has a link to its own page', async () => {
    // const params = { id: [1, 2, 3, 4, 5, 6, 7] };

    async function fetchPokebyGeneration(gen) {
      const resultsList = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`)
        .then((response) => response.json())
        .then(({ pokemon_species }) => pokemon_species.map(({ name, url }) => [name, url]));

      // enable to check results list from fetch
      // console.log(resultsList);
      return resultsList;
    }

    // params.id.forEach((number) => {
    const match = { params: { id: undefined } };
    const { container, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Generations />
      </MemoryRouter>,
    );
    // console.log(match);


    // const isGen = getByText(/Name:generation/i);
    // expect(isGen).toBeInTheDocument();

    const links = container.querySelectorAll('a');
    // console.log(links);
    // links.forEach((link) => {
    //   // console.log(fetchPokebyGeneration(Array(links).indexOf(link) + 1))
    //   fetchPokebyGeneration(randomNum).forEach((poke) => {
    //     fireEvent.click(link);
    //     const newList = container.querySelectorAll('li');
    //     newList.forEach((entry) => expect(entry).toEqual(expect.stringMatching(poke)));
    //   });
    // });
    // });
  });
});
