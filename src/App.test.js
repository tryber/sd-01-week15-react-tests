import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

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
