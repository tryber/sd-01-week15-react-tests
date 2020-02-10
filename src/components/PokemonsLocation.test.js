import React from 'react';
import {
  render, fireEvent, waitForDomChange, cleanup,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import PokemonsLocation from './PokemonsLocation';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe(`Teste do componente PokemonsLocation → 
Lets'go!!!`, () => {
  afterEach(cleanup);
  test(`Ao clicar no link "Location" na barra de navegação, a aplicação
  deve ser redirecionada para a página de Location, na URL "/location"`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const btnLocation = getByText(/Location/i);
    const location = btnLocation.href;
    fireEvent.click(btnLocation);
    expect(`http://localhost${history.location.pathname}`).toBe(location);
  });
  afterEach(cleanup);
  test('Testar se exite o LOADING', () => {
    const { getByText } = renderWithRouter(<PokemonsLocation />);
    expect(getByText(/LOADING.../i)).toBeInTheDocument();
  });
  afterEach(cleanup);
  test('Testar se exite o nome → Pokemons Location ←', async () => {
    const { getByText } = renderWithRouter(<PokemonsLocation />);
    await waitForDomChange();
    expect(getByText('Pokemons Location')).toBeInTheDocument();
  });
  afterEach(cleanup);
  test('Testar a quantidade de item na tela sendo renderizado', async () => {
    const { queryAllByTestId } = renderWithRouter(<PokemonsLocation />);
    await waitForDomChange();
    const elementP = queryAllByTestId('element-p');
    expect(elementP.length).toBe(100);
  });
  afterEach(cleanup);
  test('Testar botão previous', async () => {
    const { queryByTestId } = renderWithRouter(<PokemonsLocation />);
    await waitForDomChange();
    const btnPrevious = queryByTestId('btn-previous');
    expect(btnPrevious).toBeInTheDocument();
  });
  afterEach(cleanup);
  test('Testar botão next', async () => {
    const { queryByTestId } = renderWithRouter(<PokemonsLocation />);
    await waitForDomChange();
    const btnNext = queryByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();
  });
  afterEach(cleanup);
  test('Testar botão next caso seja apertado', async () => {
    const { queryByTestId, queryAllByTestId } = renderWithRouter(<PokemonsLocation />);
    await waitForDomChange();
    const btnNext = queryByTestId('btn-next');
    fireEvent.click(btnNext);
    const elementP = queryAllByTestId('element-p');
    expect(elementP.length).toBe(100);
  });
  afterEach(cleanup);
  test('Testar botão previous caso seja apertado', async () => {
    const { queryByTestId, queryAllByTestId } = renderWithRouter(<PokemonsLocation />);
    await waitForDomChange();
    const btnNext = queryByTestId('btn-next');
    const btnPrevious = queryByTestId('btn-previous');
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    fireEvent.click(btnPrevious);
    const elementP = queryAllByTestId('element-p');
    expect(elementP.length).toBe(100);
  });
});
