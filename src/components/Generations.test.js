
import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  wait,
} from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [...route] }) } = {},
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

  it('28.2 and 31 - the page must exhibit a list with the returned generations and with a click to access its pokemon listing page', async () => {
    const { getByText, getAllByText } = renderWithRouter(
      <App />,
    );

    const genButton = getByText(/Generations/i);
    fireEvent.click(genButton);

    await wait(() => getAllByText(/generation-/));
    const generationsList = getAllByText(/generation-/);
    const generations = await fetchPokeGenerations();

    // Teste 31
    generationsList.forEach(async (listItem) => {
      const [name, url] = generations[generationsList.indexOf(listItem)];
      // console.log(listItem.childNodes);
      expect(listItem.innerHTML).toEqual(expect.stringMatching(`${name}`));
      expect(listItem.innerHTML).toEqual(expect.stringMatching(`${url}`));

      await fireEvent.click(listItem.childNodes[3]);
      await wait(() => getAllByText(/this poke:/));
      const pokes = getAllByText(/this poke:/);

      pokes.forEach((poke) => expect(poke).toBeInTheDocument());
    });
  });


  const randomNum = Math.floor((Math.random() * 7) + 1);
  async function fetchRandomGen() {
    const resultsList = await fetch(`https://pokeapi.co/api/v2/generation/${randomNum}`)
      .then((response) => response.json())
      .then(({ pokemon_species }) => pokemon_species.map(({ name, url }) => [name, url]));

    // enable to check results list from fetch
    // console.log(resultsList);
    return resultsList;
  }


  it('30- the generations/id route works and page should exhibit a list with pokemons and their urls', async () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={[`/generations/${randomNum}`]}>
        <App />
      </MemoryRouter>,
    );

    await wait(() => getAllByText(/this poke:/));
    const pokesList = getAllByText(/this poke:/);
    const XGenPokes = await fetchRandomGen();
    // console.log(XGenPokes);

    pokesList.forEach((listItem) => {
      const [name, url] = XGenPokes[pokesList.indexOf(listItem)];
      expect(listItem.innerHTML).toEqual(expect.stringMatching(`${name}`));
      expect(listItem.innerHTML).toEqual(expect.stringMatching(`${url}`));
    });
  }, 300000);
});
