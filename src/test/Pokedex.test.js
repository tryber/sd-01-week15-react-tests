import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('renders a reading with the text `Average weight:`', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const Average = queryAllByText(/Average weight:/i);
  expect(Average.length).toBe(1);
});

test('renders a reading with the text `Próximo pokémon`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getByText(/Próximo pokémon/i);
  expect(button).toBeInTheDocument();
  const Pikachu = getByText(/Pikachu/i);
  fireEvent.click(Pikachu);
  expect(Pikachu).toBeInTheDocument();
});
