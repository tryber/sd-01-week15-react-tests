import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import About from '../components/About';

function renderWithRouter(
  ui,
  { route = '/about', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('21 Page About', () => {
  afterEach(cleanup);

  test('21.1 The page must containing a heading with text (About Pokédex)', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
    expect(getByText(/About Pokédex/i).tagName).toBe('H2');
  });

  test('21.2 The page must containing two paragraths with text about Pokedex', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();

    const twoParagraphs = document.getElementsByTagName('p');
    expect(twoParagraphs.length).toBe(2);
  });

  test('21.3 The page must containing a image about Pokedex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const imagePageAbout = getByAltText(/Pokédex/i);
    expect(imagePageAbout).toBeInTheDocument();

    const img = document.getElementsByTagName('img')[0];
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
