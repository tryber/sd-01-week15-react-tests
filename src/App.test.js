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

describe('3 Next pokemon', () => {
  afterEach(cleanup);

  test('3.1, 3.2 click on the button, appear next pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    const namePokemon = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
      'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    for (let index = 0; index < namePokemon.length; index += 1) {
      expect(getByText(namePokemon[index])).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    }
  });

  test('3.3 Last pokemon to first pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);

    const namePokemon = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
      'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    for (let index = 0; index < namePokemon.length; index += 1) {
      fireEvent.click(nextPokemon);
    }
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
});

describe('9 navigation links, page of details', () => {
  afterEach(cleanup);

  test('9.1 The URL must change for pokemon/id', () => {
    const { getByText } = renderWithRouter(<App />);

    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    const idArray = [25, 4, 10, 23, 65, 151, 78, 143, 148];

    for (let index = 0; index < idArray.length; index += 1) {
      expect(moreDetails.href).toBe(`http://localhost/pokemons/${idArray[index]}`);
      fireEvent.click(nextPokemon);
    }
  });
});

// describe('10 Page of details', () => {
//   afterEach(cleanup);

//   test('10.1 The URL must change for pokemon/id details', () => {
//     const { getByText } = renderWithRouter(<App />);

//     const moreDetails = getByText(/More details/i);
//     expect(moreDetails).toBeInTheDocument();

//     const nextPokemon = getByText(/Próximo pokémon/i);
//     expect(nextPokemon).toBeInTheDocument();

//     const home = getByText(/Home/i);
//     expect(home).toBeInTheDocument();

//     const idArray = [25, 4, 10, 23, 65, 151, 78, 143, 148];
//     // const averageWeightValue = [6.0, 8.5, 2.9, 6.9, 48.0, 4.0, 95.0, 460.0, 16.5];
//     // const namePokemon = ['Pikachu Details', 'Charmander Details', 'Caterpie Details', 'Ekans Details',
//     //   'Alakazam Details', 'Mew Details', 'Rapidash Details', 'Snorlax Details', 'Dragonair Details'];
//     // fireEvent.click(moreDetails);
//     // expect(moreDetails.href).toBe('http://localhost/pokemons/25');

//     fireEvent.click(home);

//     for (let index = 0; index < idArray.length; index += 1) {
//       // for (let cont = 1; cont <= index; cont += 1) {
//       //   fireEvent.click(nextPokemon);
//       // }
//       expect(moreDetails.href).toBe(`http://localhost/pokemons/${idArray[index]}`);
//       fireEvent.click(nextPokemon);
//       // const pokemon = getByText(averageWeightValue[index]);
//       // expect(pokemon).toBeInTheDocument();
//     }
//   });
// });

// describe('12 No details', () => {
//   afterEach(cleanup);
//   test('Without link t details about pokemon', () => {
//   })
// })

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

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
    expect(getByText(/About Pokédex/i).tagName).toBe('H2');
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
