import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Pokedex from './components/Pokedex';
import App from './App';
import { pokemons, isPokemonFavoriteById } from './tests/dataMock';

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
  const namePokemon = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
    'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

  test('3.1, 3.2 click on the button, appear next pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();


    for (let index = 0; index < namePokemon.length; index += 1) {
      expect(getByText(namePokemon[index])).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    }
  });

  test('3.3 Last pokemon to first pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);

    for (let index = 0; index < namePokemon.length; index += 1) {
      fireEvent.click(nextPokemon);
    }
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
});

describe('4 The Pokédexx must have filter buttons', () => {
  afterEach(cleanup);
  const { getByAllText, debug, getAllByRole, getByRole } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
    </MemoryRouter>,
  );
  // debug();

//   test('4.1 ThePokedex filter the pokemons and show them', () => {
//     // let buttonAll = getByAllText(/All/i);
//     const role = getAllByRole('button');
//     console.log(role)
//     const pokemonType = pokemons.map(({ type }) => type);
//     expect(pokemonType.length).toBe(6);
//     expect(pokemonType).toBe(['pikachu']);
//   });
});

describe('5 reset filter', () => {
  afterEach(cleanup);
  const namePokemon = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
    'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

  test('5.1 The text of button must be All', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/All/i)).toBeInTheDocument();
  });

  test('5.2 after clicking, The pokédex must show all pokemons', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/All/i));

    const firstTagP = document.getElementsByTagName('p')[0];
    const nextPokemon = getByText(/Próximo pokémon/i);

    for (let index = 0; index < namePokemon.length; index += 1) {
      expect(firstTagP.innerHTML).toBe(namePokemon[index]);
      fireEvent.click(nextPokemon);
    }
  });

  test('5.3 when the page reload, the filter is the button All', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/Home/i));
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();

    const firstTagP = document.getElementsByTagName('p')[0];
    const nextPokemon = getByText(/Próximo pokémon/i);

    for (let index = 0; index < namePokemon.length; index += 1) {
      expect(firstTagP.innerHTML).toBe(namePokemon[index]);
      fireEvent.click(nextPokemon);
    }
  });
});

describe('6 Dinamic filter', () => {
  afterEach(cleanup);
  const { getAllByText, getByText, debug } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
    </MemoryRouter>,
  );

  test('the pokedex genre a dinamic filter to each type pokemon', () => {
    debug()
    pokemons.forEach(({ type }) => {
      const buttonType = getAllByText(type)[1] || getByText(type);
      expect(buttonType).toBeInTheDocument();
      expect(getByText(/All/i)).toBeInTheDocument();
    });
  });
});

// describe('7 disable the button', () => {
//   afterEach(cleanup);

//   const { getAllByText, getByText, debug } = render(
//     <MemoryRouter initialEntries={['/']}>
//       <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
//     </MemoryRouter>,
//   );

//   test('7.1 If the pokemons list has one pokemon, the button (proximo pokemon) must be disable', () => {

//   });
// });

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
//     for (let index = 0; index <= pokemons.length; index += 1) {
//       const { getByRole, history, getByText } = render(
//         <MemoryRouter initialEntries={['/']}>
//           <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />
//         </MemoryRouter>,
//       );

//       expect(history.location.pathname).toBe('/');

//       for (let nextButton = 0; nextButton < index ; nextButton += 1) {
//         fireEvent.click(getByText(/Próximo pokémon/i));
//       }

//       const link = fireEvent.click(getByRole('link'));

//       if (index === pokemons.length) {
//         expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id]}`)
//       }

//       else {

//       }


//     }
//   });
// });


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
    const { getByText, history } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/home/i));

    const link = `http://localhost${history.location.pathname}`;
    expect(link).toBe('http://localhost/');

    const continuesHomePage = getByText(/Encountered pokémons/i);
    expect(continuesHomePage).toBeInTheDocument();
  });

  test('19 page shows about pokédex', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/About/i));

    const link = `http://localhost${history.location.pathname}`;
    expect(link).toBe('http://localhost/about');

    const aboutInfo = getByText(/About Pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  test('20 page shows favorite pokémons page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const favoritePage = getByText(/No favorite pokemon found/i);
    expect(favoritePage).toBeInTheDocument();

    const link = `http://localhost${history.location.pathname}`;
    expect(link).toBe('http://localhost/favorites');
  });
});

// describe('22 Page shows favorites paokemons', () => {
//   afterEach(cleanup);
//   const namePokemon = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
//     'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

//   test('22.1 the page shows all favorites pokemons, one pokemon', () => {
//     const { getByText, getByLabelText } = renderWithRouter(<App />);
//     for (let index = 0; index < namePokemon.length; index += 1) {
//       for (let cont = 0; cont < index; cont += 1) {
//         if (cont !== 0) {
//           fireEvent.click(getByText(/Próximo pokémon/i));
//         }
//       }
//       fireEvent.click(getByText(/More details/i));
//       fireEvent.click(getByLabelText(/Pokémon favoritado?/i));
//       fireEvent.click(getByText(/Favorite Pokémons/i));

//       const firstTagP = document.getElementsByTagName('p')[0];
//       expect(firstTagP.innerHTML).toBe(namePokemon[index]);
//       fireEvent.click(getByText(/Home/i));
//     }
//   });
// });
