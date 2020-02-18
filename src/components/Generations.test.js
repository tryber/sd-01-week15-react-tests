
import React from 'react';
import { render, cleanup, fireEvent, wait, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import { Router, MemoryRouter, Redirect } from 'react-router-dom';
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
    const { getByText, getAllByText } = renderWithRouter(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const genButton = getByText(/Generations/i);
    fireEvent.click(genButton);

    await wait(() => getAllByText(/generation-/));
    const generationsList = getAllByText(/generation-/);
    const generations = await fetchPokeGenerations();

    generationsList.forEach((listItem) => {
      const [name, url] = generations[generationsList.indexOf(listItem)];
      expect(listItem.innerHTML).toEqual(expect.stringMatching(`${name}`));
      expect(listItem.innerHTML).toEqual(expect.stringMatching(`${url}`));
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

  it('30.2 - the generations/id page should exhibit a list with pokemons and their urls', async () => {
    const { getAllByText } = renderWithRouter(
      <MemoryRouter initialEntries={[`/generations/${randomNum}`]}>
        <App />
      </MemoryRouter>,
    );


    // await wait(() => getAllByText(/generation-/));
    // const generationsList = getAllByText(/generation-/)
    // console.log(generationsList)

    // const link = getAllByText(/https/i);
    // console.log (link)
    // fireEvent.click(link[0]);

    await wait(() => getAllByText(/this poke:/));
    const pokesList = getAllByText(/this poke:/);
    // console.log(pokesList)
    const XGenPokes = await fetchRandomGen();

    // console.log(XGenPokes);

    pokesList.forEach((listItem) => {
      const [name, url] = XGenPokes[pokesList.indexOf(listItem)];
      expect(listItem.innerHTML).toEqual(expect.stringMatching(`${name}`));
      expect(listItem.innerHTML).toEqual(expect.stringMatching(`${url}`));
    });
  }, 300000);

  async function fetchPokebyGeneration(gen) {
    const resultsList = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`)
      .then((response) => response.json())
      .then(({ pokemon_species }) => pokemon_species.map(({ name, url }) => [name, url]));

    // enable to check results list from fetch
    // console.log(resultsList);
    return resultsList;
  }

  it.skip('31 - each generation has a link to its own page', async () => {
    const { getAllByText, getByText } = renderWithRouter(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const genButton = getByText(/Generations/i);
    fireEvent.click(genButton);

    await wait(() => getAllByText(/generation-/));
    const generationsList = getAllByText(/generation-/);

    const buttonArray = generationsList.map((li) => {
      const buttons = [];
      buttons.push(li.childNodes[3]);
      return buttons;
    });
    // console.log(buttonArray[0][0]);

    // fireEvent.click(buttonArray[0][0]);
    await wait(() => getAllByText(/this poke:/));
    const pokesList = getAllByText(/this poke:/);
    console.log(pokesList);

    // const XGenPokes = await fetchPokebyGeneration(1);

    // console.log(XGenPokes);

    // return pokesList.forEach((listItem) => {
    //   const [name, url] = XGenPokes[pokesList.indexOf(listItem)]
    //   console.log(name, url)
    //   expect(listItem.innerHTML).toEqual(expect.stringMatching(`${name}`));
    //   expect(listItem.innerHTML).toEqual(expect.stringMatching(`${url}`));
    // });
  }, 300000);
});
