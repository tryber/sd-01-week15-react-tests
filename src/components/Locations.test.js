
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Locations from './Locations';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

afterEach(cleanup);

describe('locations page test suite', () => {
  async function fetchPokeLocations() {
    const resultsList = await fetch('https://pokeapi.co/api/v2/location/')
      .then((response) => response.json())
      .then(({ results }) => results.map(({ name, url }) => [name, url]));

    // enable to check results list from fetch
    // console.log(resultsList);
    return resultsList;
  }

  it('25.2 - the page must exhibit a list with the returned locations', () => {
    const { container } = renderWithRouter(
      <Locations />,
    );
    const locationList = container.querySelectorAll('li');
    const locations = fetchPokeLocations();

    locationList.forEach((listItem) => locations.forEach(([name, url]) => (
      expect(listItem).toEqual(expect.arrayContaining(name, url)))));
  });

  it('27. page has 2 paginations buttons, previous and next and get disabled properly', () => {
    const { getByText, queryByText } = renderWithRouter(
      <Locations />,
    );
    let previousButton = getByText(/previous page/i);
    let nextButton = getByText(/next page/i);
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    const primeiraPagina = getByText(/page 1/i);
    if (expect(primeiraPagina).toBeInTheDocument()) {
      previousButton = getByText(/previous page/i);
      expect(previousButton.disabled).toBeTruthy();
    }

    const clicker = (button) => {
      for (let i = 0; i < 40; i += 1) {
        fireEvent.click(button);
      }
    };

    clicker(nextButton);
    nextButton = getByText(/next page/i);
    expect(queryByText(/page 40/i)).toBeInTheDocument();
    expect(nextButton.disabled).toBeTruthy();

    clicker(previousButton);
    previousButton = getByText(/previous page/i);
    expect(queryByText(/page 1/i)).toBeInTheDocument();
    expect(previousButton.disabled).toBeTruthy();
  });
});
