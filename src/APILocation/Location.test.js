import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';

import App from '../App';
import PokeLocationAPI from './PokeLocationAPI';

function renderWithRouter(
  ui,
  { route = '/locations', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Requisito 25 e 26', () => {
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
  });
});

describe('Requisito 27', () => {
  test('Button Disabled', async () => {

    const { getByText, queryAllByTestId } = renderWithRouter(<PokeLocationAPI />);

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
