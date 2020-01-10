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

describe('Render the pokedex with the pokemon', () => {
  test('2 render one image', () => {
    const { getAllByText } = renderWithRouter(<App />);

    expect(getAllByText(/Average weight/i).length).toBe(1);
  });
});

describe('17 Fixed set of navigation links', () => {
  afterEach(cleanup);

  test('17.1 First link Home with URL (/)', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    expect(home.href).toBe('http://localhost/');

    const about = getByText(/About/i);
    expect(about.href).toBe('http://localhost/about');

    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites.href).toBe('http://localhost/favorites');
  });
});

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

  test('21.2 The page must containing two paragraths with text about Pokedex', () => {
    const { getByText } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/About/i));

    const twoParagraphs = document.getElementsByTagName('p');
    expect(twoParagraphs.length).toBe(2);
  });

  test('21.3 The page must containing a image about Pokedex', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/About/i));

    const imagePageAbout = getByAltText(/Pokédex/i);
    expect(imagePageAbout).toBeInTheDocument();
  });
});
