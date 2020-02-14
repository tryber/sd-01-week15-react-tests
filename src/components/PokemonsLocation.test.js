import React from 'react';
import {
  render, fireEvent, waitForDomChange, cleanup,
} from '@testing-library/react';
import nock from 'nock';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import PokemonsLocation from './PokemonsLocation';
import dataOfComparition from './dataOftestNock';

const clear = () => afterEach(function () {
  nock.cleanAll();
  cleanup();
});

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
  clear();
  test(`Ao clicar no link "Location" na barra de navegação, a aplicação
  deve ser redirecionada para a página de Location, na URL "/location"`, async () => {
    const scope = nock('https://pokeapi.co')
      .get('/api/v2/location/?limit=100&offset=0')
      .reply(200, { results: dataOfComparition }, { 'Access-Control-Allow-Origin': '*' });
    const { getByText, history } = renderWithRouter(<App />);
    await waitForDomChange();
    expect(history.location.pathname).toBe('/');
    const btnLocation = getByText(/Location/i);
    const location = btnLocation.href;
    fireEvent.click(btnLocation);
    expect(`http://localhost${history.location.pathname}`).toBe(location);
  });
  clear();
});
//   clear();
//   test('Testar se exite o LOADING', () => {
//     const { getByText } = renderWithRouter(<PokemonsLocation />);
//     expect(getByText(/LOADING.../i)).toBeInTheDocument();
//   });
//   clear();
//   test('Testar se exite o nome → Pokemons Location ←', async () => {
//     const { getByText } = renderWithRouter(<PokemonsLocation />);
//     await waitForDomChange();
//     expect(getByText('Pokemons Location')).toBeInTheDocument();
//   });
//   clear();
//   test('Testar a quantidade de item na tela sendo renderizado', async () => {
//     const { queryAllByTestId } = renderWithRouter(<PokemonsLocation />);
//     await waitForDomChange();
//     const elementP = queryAllByTestId('element-p');
//     expect(elementP.length).toBe(100);
//   });
//   clear();
//   test('Testar botão previous', async () => {
//     const { queryByTestId } = renderWithRouter(<PokemonsLocation />);
//     await waitForDomChange();
//     const btnPrevious = queryByTestId('btn-previous');
//     expect(btnPrevious).toBeInTheDocument();
//   });
//   clear();
//   test('Testar botão next', async () => {
//     const { queryByTestId } = renderWithRouter(<PokemonsLocation />);
//     await waitForDomChange();
//     const btnNext = queryByTestId('btn-next');
//     expect(btnNext).toBeInTheDocument();
//   });
//   // clear();
//   // test('Testar botão next caso seja apertado', async () => {
//   //   const { queryByTestId, queryAllByTestId } = renderWithRouter(<PokemonsLocation />);
//   //   await waitForDomChange();
//   //   const btnNext = queryByTestId('btn-next');
//   //   fireEvent.click(btnNext);
//   //   const elementP = queryAllByTestId('element-p');
//   //   expect(elementP.length).toBe(100);
//   // });
//   // clear();
//   // test('Testar botão previous caso seja apertado', async () => {
//   //   const { queryByTestId, queryAllByTestId } = renderWithRouter(<PokemonsLocation />);
//   //   await waitForDomChange();
//   //   const btnNext = queryByTestId('btn-next');
//   //   const btnPrevious = queryByTestId('btn-previous');
//   //   fireEvent.click(btnNext);
//   //   fireEvent.click(btnNext);
//   //   fireEvent.click(btnPrevious);
//   //   const elementP = queryAllByTestId('element-p');
//   //   expect(elementP.length).toBe(100);
//   //   clear();
// });

// // clear();
// // test('Testar se os botões se desativam no inicio ou no final
// respectivamente parte II', async () => {
// //   const { queryByTestId } = renderWithRouter(<PokemonsLocation />);
// //   await waitForDomChange();
// //   const btnNext = queryByTestId('btn-next');
// //   const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
// //   for (let index = 0; index <= 7; index++) {
// //     sleep(5000).then(() => fireEvent.click(btnNext));
// //   }
// //   fireEvent.click(btnNext);
// //   fireEvent.click(btnNext);
// //   fireEvent.click(btnNext);
// //   fireEvent.click(btnNext);
// //   fireEvent.click(btnNext);
// //   fireEvent.click(btnNext);
// //   fireEvent.click(btnNext);
// //   fireEvent.click(btnNext);
// //   fireEvent.click(btnNext);
// //   fireEvent.click(btnNext);
// //   expect(btnNext.disabled).not.toBe(true);
// // });

describe(`Teste do componente PokemonsLocation com NOCK/MOCK → 
Lets'go!!!`, () => {
  test('Testar se a api tá funfando e o botão Previous', async () => {
    const scope = nock('https://pokeapi.co')
      .get('/api/v2/location/?limit=100&offset=0')
      .reply(200, { results: dataOfComparition }, { 'Access-Control-Allow-Origin': '*' });
    const { queryAllByTestId, queryByTestId } = renderWithRouter(<PokemonsLocation />);
    await waitForDomChange();
    const elementP = queryAllByTestId('element-p');
    expect(elementP).toBeDefined();
    const btnPrevious = queryByTestId('btn-previous');
    expect(btnPrevious.disabled).toBe(true);
    scope.done();
    clear();
  });
});
