import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Exigência → 2', () => {
  test('2 - A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { queryAllByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const pokemon = queryAllByText(/Average weight:/i);

    expect(pokemon.length).toBe(1);
  });
});
