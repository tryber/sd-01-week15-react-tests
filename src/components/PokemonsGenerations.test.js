import React from 'react';
import {
  render, fireEvent, waitForDomChange, cleanup,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import PokemonsGenerations from './PokemonsGenerations';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe(`Teste do componente PokemonsGenerations → 
Lets'go!!!`, () => {
  afterEach(cleanup);
  test(`Ao clicar no link "Generations" na barra de navegação, a aplicação
  deve ser redirecionada para a página de Generations, na URL "/generations"`, async () => {
    const { getByText, history, queryAllByTestId } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const btnGenerations = getByText(/generations/i);
    const generations = btnGenerations.href;
    fireEvent.click(btnGenerations);
    expect(`http://localhost${history.location.pathname}`).toBe(generations);
    await waitForDomChange();
    const elementDiv = queryAllByTestId('element-div');
    expect(elementDiv.length).toBe(7);
  });
  afterEach(cleanup);
  test('Testar se exite o LOADING', () => {
    const { getByText } = renderWithRouter(<PokemonsGenerations />);
    expect(getByText(/LOADING.../i)).toBeInTheDocument();
  });
  afterEach(cleanup);
  test('Testar se exite o nome → Pokemons Generations ←', async () => {
    const { getByText } = renderWithRouter(<PokemonsGenerations />);
    await waitForDomChange();
    expect(getByText('Pokemons Generations')).toBeInTheDocument();
  });
  afterEach(cleanup);
  test('Testar se exite o nome → Click in generation ←', async () => {
    const { getByText } = renderWithRouter(<PokemonsGenerations />);
    await waitForDomChange();
    expect(getByText('Click in generation')).toBeInTheDocument();
  });
  afterEach(cleanup);
  test('Testar a quantidade de item na tela sendo renderizado', async () => {
    const { queryAllByTestId } = renderWithRouter(<PokemonsGenerations />);
    await waitForDomChange();
    const elementDiv = queryAllByTestId('element-div');
    expect(elementDiv.length).toBe(7);
  });
  // afterEach(cleanup);
  // test('Testar a div generation-i', async () => {
  //   const { getByText } = renderWithRouter(<PokemonsGenerations />);
  //   await waitForDomChange();
  //   expect(getByText('generation-i')).toBeInTheDocument();
  // });
  // afterEach(cleanup);
  // test('Testar a div generation-ii', async () => {
  //   const { getByText } = renderWithRouter(<PokemonsGenerations />);
  //   await waitForDomChange();
  //   expect(getByText('generation-ii')).toBeInTheDocument();
  // });
  // afterEach(cleanup);
  // test('Testar a div generation-iii', async () => {
  //   const { getByText } = renderWithRouter(<PokemonsGenerations />);
  //   await waitForDomChange();
  //   expect(getByText('generation-iii')).toBeInTheDocument();
  // });
  // afterEach(cleanup);
  // test('Testar a div generation-iv', async () => {
  //   const { getByText } = renderWithRouter(<PokemonsGenerations />);
  //   await waitForDomChange();
  //   expect(getByText('generation-iv')).toBeInTheDocument();
  // });
  // afterEach(cleanup);
  // test('Testar a div generation-v', async () => {
  //   const { getByText } = renderWithRouter(<PokemonsGenerations />);
  //   await waitForDomChange();
  //   expect(getByText('generation-v')).toBeInTheDocument();
  // });
  // afterEach(cleanup);
  // test('Testar a div generation-vi', async () => {
  //   const { getByText } = renderWithRouter(<PokemonsGenerations />);
  //   await waitForDomChange();
  //   expect(getByText('generation-vi')).toBeInTheDocument();
  // });
  // afterEach(cleanup);
  // test('Testar a div generation-vii', async () => {
  //   const { getByText } = renderWithRouter(<PokemonsGenerations />);
  //   await waitForDomChange();
  //   expect(getByText('generation-vii')).toBeInTheDocument();
  // });
});
