import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('1 shows the Pokedéx when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

// jest.mock('react-router-dom', () => {
//   const originalModule = jest.requireActual('react-router-dom');

//   return {
//     ...originalModule,
//     BrowserRouter: ({ children }) => (<div>{children}</div>),
//   };
// });

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('routes', () => {
  afterEach(cleanup);

  test('18 page shows home page', () => {
    const { getByText } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/home/i));

    const continuesHomePage = getByText(/Encountered pokémons/i);
    expect(continuesHomePage).toBeInTheDocument();
  });

  test('19 page shows about pokédex', () => {
    const { getByText } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/About/i));

    const aboutInfo = getByText(/About Pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  test('20 page shows home page', () => {
    const { getAllByText } = renderWithRouter(<App />);

    const homePage = getAllByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getAllByText(/Favorite Pokémons/i));

    const favoritePage = getAllByText(/Favorite Pokémons/i);
    expect(favoritePage).toBeInTheDocument();
  });
});
