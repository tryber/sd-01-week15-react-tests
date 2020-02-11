import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent, getByText } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => (<div> {children} </div>),
  }
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

// const { debug } = renderWithRouter(<App />);
// console.log(debug())

describe('Render Routes', () => {
  describe('<h?> testing <h?/>', () => {
    // Task 01
    test('should have a pokédex title', () => {
      const { queryAllByRole } = renderWithRouter(<App />);
      const headingHTMLall = queryAllByRole('heading').map(HTML => HTML.innerHTML);

      expect(headingHTMLall.includes('Pokédex')).toBeTruthy();
      expect(headingHTMLall.includes('Encountered pokémons')).toBeTruthy();
    });
  })
  describe('Navegation Links', () => {
    // Task 17-01 18
    test('should have a home', () => {
      const { history, queryAllByRole } = renderWithRouter(<App />);
      const linkHTMLall = queryAllByRole('link').map(HTML => HTML.innerHTML);
      const homeLink = queryAllByRole('link')[linkHTMLall.indexOf('Home')];

      expect(homeLink.href).toBe('http://localhost/');

      fireEvent.click(homeLink);

      expect(history.location.pathname).toBe('/');
    });
    // Task 17-02 19
    test('should have an about', () => {
      const { history, queryAllByRole } = renderWithRouter(<App />);
      const linkHTMLall = queryAllByRole('link').map(HTML => HTML.innerHTML);
      const aboutLink = queryAllByRole('link')[linkHTMLall.indexOf('About')];

      expect(aboutLink.href).toBe('http://localhost/about');

      fireEvent.click(aboutLink);

      expect(history.location.pathname).toBe('/about');
    });
    // Task 17-04 20
    test('should have a favorite pokemons', () => {
      const { history, queryAllByRole } = renderWithRouter(<App />);
      const linkHTMLall = queryAllByRole('link').map(HTML => HTML.innerHTML);
      const favoriteLink = queryAllByRole('link')[linkHTMLall.indexOf('Favorite Pokémons')];

      expect(favoriteLink.href).toBe('http://localhost/favorites');

      fireEvent.click(favoriteLink);

      expect(history.location.pathname).toBe('/favorites');
    });
  })

  test('testing all props change', () => {
    const { debug, getByText, queryAllByRole, queryByText, container } = renderWithRouter(<App />);

    expect(getByText(/More Details/i)).toBeInTheDocument();

    fireEvent.click(getByText(/More Details/i));

    expect(queryByText(/More Details/i)).toBeNull();

    const inputHTMLall = Object.keys(container.getElementsByTagName('input')).map(key => container.getElementsByTagName('input')[key]);

    inputHTMLall.forEach((input) => {
      if (input.id === 'favorite') {
        expect(input.checked).toBeFalsy();
        fireEvent.click(input)
        expect(input.checked).toBeTruthy();
        fireEvent.click(input)
        expect(input.checked).toBeFalsy();
      }
    })
  });
})
