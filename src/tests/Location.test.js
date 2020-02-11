import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange,
} from '@testing-library/react';

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
