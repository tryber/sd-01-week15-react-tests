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

test('the Pokedéx must show only 1 pokémon', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemon = queryAllByText(/Average weight:/i);
  expect(pokemon.length).toBe(1);
});

test('shows the next pókemon when press the button', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nextButton = getByText(/Próximo pokémon/i);
  expect(nextButton).toBeInTheDocument();

  const firstPokemon = getByTestId('pokemon-name').textContent;

  fireEvent.click(nextButton);

  const pokemonName = getByTestId('pokemon-name');
  expect(firstPokemon).not.toBe(pokemonName.textContent);

  for (let i = 0; i < data.length - 1; i += 1) {
    fireEvent.click(nextButton);
  }
  expect(pokemonName.textContent).toBe(firstPokemon);
});
