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

describe('Routes', () => {
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
    const { getByText } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const favoritePage = getByText(/No favorite pokemon found/i);
    expect(favoritePage).toBeInTheDocument();
  });
});

describe('21 Page About', () => {
  afterEach(cleanup);

  test('21.1 The page must containing a heading with text (About Pokédex)', () => {
    const { getByText } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/About/i));

    const aboutInfo = getByText(/About Pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  // test('21.2 The page must containing two paragraths with text about Pokedex', () => {
  // });

  test('21.3 The page must containing a image about Pokedex', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/About/i));

    const imagePageAbout = getByAltText(/Pokédex/i);
    expect(imagePageAbout).toBeInTheDocument();
  });
});

describe('23 Show error', () => {
  test('23.1 The page shows error 404', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/coruja' });

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });

  test('23.2 The page must containing a image about Pokedex', () => {
    const { getByAltText } = renderWithRouter(<App />, { route: '/coruja'});

    const imagePageAbout = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imagePageAbout).toBeInTheDocument();
  });
});
