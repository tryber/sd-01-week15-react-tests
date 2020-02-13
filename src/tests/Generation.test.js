import React from 'react';
import { Router } from 'react-router-dom';
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
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

describe('28 & 29 Generations', () => {
  afterEach(cleanup);

  const generationX = [
    'generation-i', 'generation-ii', 'generation-iii', 'generation-iv',
    'generation-v', 'generation-vi', 'generation-vii',
  ];

  const amountPokemonsGeneraion = [
    151, 100, 135, 107, 156, 72, 86,
  ];

  test('The URL route is generations and geneneration-i', async () => {
    const { getByText, history, queryAllByTestId } = renderWithRouter(<App />);

    const generation = getByText(/Generations/i);
    expect(generation).toBeInTheDocument();
    expect(generation.href).toBe('http://localhost/generations');

    fireEvent.click(generation);
    expect(history.location.pathname).toBe('/generations');
    expect(getByText(/Loading.../i)).toBeInTheDocument();
    await waitForDomChange();
    expect(queryAllByTestId(/generation/i).length).toBe(7);

    const generationPokemon = getByText(generationX[0]);
    expect(generationPokemon).toBeInTheDocument();
    fireEvent.click(generationPokemon);
    await waitForDomChange();
    expect(queryAllByTestId(/pokemon-species/i).length).toBe(amountPokemonsGeneraion[0]);
  });

  test('The URL route is generations geneneration-ii', async () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<App />, { route: '/generations' });

    await waitForDomChange();
    const generationPokemon = getByText(generationX[1]);
    expect(generationPokemon).toBeInTheDocument();

    fireEvent.click(generationPokemon);
    await waitForDomChange();
    expect(queryAllByTestId(/pokemon-species/i).length).toBe(amountPokemonsGeneraion[1]);
  });

  test('The URL route is generations geneneration-iii', async () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<App />, { route: '/generations' });

    await waitForDomChange();
    const generationPokemon = getByText(generationX[2]);
    expect(generationPokemon).toBeInTheDocument();

    fireEvent.click(generationPokemon);
    await waitForDomChange();
    expect(queryAllByTestId(/pokemon-species/i).length).toBe(amountPokemonsGeneraion[2]);
  });

  test('The URL route is generations geneneration-iv', async () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<App />, { route: '/generations' });

    await waitForDomChange();
    const generationPokemon = getByText(generationX[3]);
    expect(generationPokemon).toBeInTheDocument();

    fireEvent.click(generationPokemon);
    await waitForDomChange();
    expect(queryAllByTestId(/pokemon-species/i).length).toBe(amountPokemonsGeneraion[3]);
  });

  test('The URL route is generations geneneration-v', async () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<App />, { route: '/generations' });

    await waitForDomChange();
    const generationPokemon = getByText(generationX[4]);
    expect(generationPokemon).toBeInTheDocument();

    fireEvent.click(generationPokemon);
    await waitForDomChange();
    expect(queryAllByTestId(/pokemon-species/i).length).toBe(amountPokemonsGeneraion[4]);
  });

  test('The URL route is generations geneneration-vi', async () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<App />, { route: '/generations' });

    await waitForDomChange();
    const generationPokemon = getByText(generationX[5]);
    expect(generationPokemon).toBeInTheDocument();

    fireEvent.click(generationPokemon);
    await waitForDomChange();
    expect(queryAllByTestId(/pokemon-species/i).length).toBe(amountPokemonsGeneraion[5]);
  });

  test('The URL route is generations geneneration-vii', async () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<App />, { route: '/generations' });

    await waitForDomChange();
    const generationPokemon = getByText(generationX[6]);
    expect(generationPokemon).toBeInTheDocument();

    fireEvent.click(generationPokemon);
    await waitForDomChange();
    expect(queryAllByTestId(/pokemon-species/i).length).toBe(amountPokemonsGeneraion[6]);
  });
});


// describe('28 & 29 Generations', () => {
//   afterEach(cleanup);

//   const generations = [
//     'generation-i', 'generation-ii', 'generation-iii', 'generation-iv',
//     'generation-v', 'generation-vi', 'generation-vii',
//   ];

//   const amountPokemonsGeneraion = [
//     151, 100, 135, 107, 156, 72, 86,
//   ];

//   const generationsPokemons = async (generationPoke) => {
//     const { getByText, history, queryAllByTestId, queryAllByTex } = renderWithRouter(<App />);
//     const generation = getByText(/Generations/i);
//     expect(generation).toBeInTheDocument();
//     expect(generation.href).toBe('http://localhost/generations');

//     fireEvent.click(generation);
//     expect(history.location.pathname).toBe('/generations');
//     expect(getByText(/Loading.../i)).toBeInTheDocument();

//     await waitForDomChange();
//     expect(queryAllByTestId(/generation/i).length).toBe(7);
//     expect(getByText(generationPoke)).toBeInTheDocument();
//   };

//   generations.forEach((generationPokemon) => {
//     test('The URL route is generations', () => {
//       generationsPokemons(generationPokemon);
//     });
//   });
// });
