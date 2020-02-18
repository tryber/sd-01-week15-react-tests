import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Teste amostra da Trybe', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('Mostrar a pokedex caso a rota seja → "/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Testando outros teste para ver se passa no 100% → "/"', () => {
    const {
      getByText, getByLabelText, getAllByRole, queryByText,
    } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    fireEvent.click(getByText('More details'));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(getByLabelText('Pokémon favoritado?').checked).toBe(false);
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    expect(getByLabelText('Pokémon favoritado?').checked).toBe(true);
    fireEvent.click(getAllByRole('link')[2]);
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText('More details'));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(getByLabelText('Pokémon favoritado?').checked).toBe(true);
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    expect(getByLabelText('Pokémon favoritado?').checked).toBe(false);
    fireEvent.click(getAllByRole('link')[2]);
    expect(queryByText('Pikachu')).not.toBeInTheDocument();
  });
});
