import React from 'react';
import { Router } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { pokemons, isPokemonFavoriteById, isNotPokemonFavoriteById } from './dataMock';

function renderWithRouter(
  ui,
  { route = '/favorites', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}
