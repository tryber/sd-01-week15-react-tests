import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange,
} from '@testing-library/react';

import App from '../App';
import PokeAPILocation from '../APILocation/PokeAPILocation';

function renderWithRouter(
  ui,
  { route = '/locations', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('25 & 26 Locations', () => {
  afterEach(cleanup);

  test('The URL of route is location', async () => {
    const { getByText, history } = renderWithRouter(<App />);

    const location = getByText(/Locations/i);
    expect(location).toBeInTheDocument();
    expect(location.href).toBe('http://localhost/locations');

    fireEvent.click(location);
    expect(history.location.pathname).toBe('/locations');

    await waitForDomChange();

    const previousButton = getByText(/Previous/i);
    const nextButton = getByText(/Next/i);
    expect(previousButton).toBeInTheDocument();
    expect(previousButton.tagName).toBe('BUTTON');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.tagName).toBe('BUTTON');

    // expect(APILocation).toHaveBeenCalledTimes(1);
    // Implementar um método para pegar as informações da API;
  });
});

describe('27 disable buttons', () => {
  afterEach(cleanup);

  test('27.1 list of locations and button disabled', async () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<PokeAPILocation />);

    await waitForDomChange();

    const nextButton = getByText(/Next/i);
    const previousButton = getByText(/Previous/i);
    expect(previousButton).toBeDisabled();

    for (let index = 0; index < 7; index += 1) {
      const locationsName = queryAllByTestId(/location-name/i);
      expect(locationsName.length).toBe(100);
      fireEvent.click(nextButton);
    }

    expect(previousButton).toBeDisabled();
  });
});
