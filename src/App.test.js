import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';
import { elementType } from 'prop-types';
import { NotFound } from './components';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

//1
test('shows the Pokedéx when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

//2
test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const onePokemon = queryAllByText(/Average weight/i);
  expect(onePokemon.length).toBe(1);
});

//16
test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const onePokemon = queryAllByText(/Average weight/i);
  expect(onePokemon.length).toBe(1);
});

//18
test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(getByText(/Home/i));

  const homeInfo = getByText(/Próximo pokémon/i);
  expect(homeInfo).toBeInTheDocument();
});

//19
test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(getByText(/About/i));

  const aboutInfo = getByText(/About Pokédex/i);
  expect(aboutInfo).toBeInTheDocument();
});

//20
test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(getByText(/Favorite Pokémons/i));

  const noFavoritePokemonInfo = getByText(/No favorite pokemon found/i);
  expect(noFavoritePokemonInfo).toBeInTheDocument();
});

//23
describe('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = renderWithRouter(<NotFound />, { route: '/bad' });
    const getHeading = getByText(/Page requested not found/i);
    expect(getHeading).toBeInTheDocument();
    expect(getHeading.tagName).toBe('H2');
  });

  test('A página deve exibir a imagem https://testing-library.com/', () => {
    const { getByAltText } = renderWithRouter(<NotFound />, { route: '/bad' });
    const altText = getByAltText('Pikachu crying because the page requested was not found');
    expect(altText).toBeInTheDocument(); 
  });
});
