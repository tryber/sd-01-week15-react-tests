import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import data from './data';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('shows the Pokedéx when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { queryAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const pokemon = queryAllByText(/Average weight:/i);

  expect(pokemon.length).toBe(1);
});
test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista.', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const btnNextPokemon = getByText(/Próximo pokémon/i);
  expect(btnNextPokemon).toBeInTheDocument();

  const pokemon = getByTestId('pokemon-name').textContent;

  fireEvent.click(btnNextPokemon);

  const namePokemon = getByTestId('pokemon-name');
  expect(pokemon).not.toBe(namePokemon.textContent);

  for (let i = 0; i < data.length - 1; i += 1) {
    fireEvent.click(btnNextPokemon);
  }
  expect(namePokemon.textContent).toBe(pokemon);
});
