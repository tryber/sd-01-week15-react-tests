import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';
import { pokemons } from './tests/dataMock';

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

  test('4.1 ThePokedex filter the pokemons and show them', () => {
    const { getByText, queryAllByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const buttonType = queryAllByText(pokemon.type)[1] || getByText(pokemon.type);
      fireEvent.click(buttonType);
      fireEvent.click(nextPokemon);
      fireEvent.click(nextPokemon);
      const samePokemon = queryAllByText(pokemon.type);
      expect(samePokemon.length).toBe(2);
      expect(pokemon.type).toBe(buttonType.innerHTML);
    });
  });
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

  test('the pokedex genre a dinamic filter to each type pokemon', () => {
    const { getByText, queryAllByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokemonType = queryAllByText(`${pokemon.type}`);
      expect(pokemonType.length).toBe(2);
      expect(pokemonType[0].tagName).toBe('P');
      expect(pokemonType[1].tagName).toBe('BUTTON');

      const all = getByText(/All/i);
      expect(all.tagName).toBe('BUTTON');

      fireEvent.click(nextPokemon);
    });
  });
});

describe('7 disable the button', () => {
  afterEach(cleanup);

  test('7.1 disable pokemon with one type', () => {
    const { getByText, queryAllByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const buttonType = queryAllByText(pokemon.type)[1] || getByText(pokemon.type);
      fireEvent.click(buttonType);
      if (pokemon.type === 'Fire' || pokemon.type === 'Psychic') {
        expect(nextPokemon).toBeEnabled();
      } else {
        expect(nextPokemon).toBeDisabled();
      }
    });
  });
});

describe('8 The pokedéx show the pokemon', () => {
  afterEach(cleanup);

  test('8.1 The show name, type, weight and image', () => {
    const { getByText, getByAltText, getAllByText } = renderWithRouter(<App />);

    const nextPokemon = getByText(/More details/i);
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(getByText(`${pokemon.name}`)).toBeInTheDocument();
      const pokemonType = getAllByText(`${pokemon.type}`);
      expect(pokemonType.length).toBe(2);

      const averageWeight = getByText(`Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
      expect(averageWeight).toBeInTheDocument();

      const imageAlt = getByAltText(`${pokemon.name} sprite`);
      expect(imageAlt).toBeInTheDocument();
      expect(imageAlt.src).toBe(pokemon.image);

      fireEvent.click(getByText(/Próximo pokémon/i));
    });
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

describe('17 Fixed set of navigation links', () => {
  afterEach(cleanup);

  test('17.1 First link Home with URL (/)', () => {
    const { getByText, queryAllByRole } = renderWithRouter(<App />);

    const firstLink = queryAllByRole('link')[0].innerHTML;
    const secondLink = queryAllByRole('link')[1].innerHTML;
    const thirdLink = queryAllByRole('link')[2].innerHTML;
    expect(firstLink).toBe('Home');
    expect(secondLink).toBe('About');
    expect(thirdLink).toBe('Favorite Pokémons');

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

describe('25 & 26 Locations', () => {
  afterEach(cleanup);

  jest.mock('./tests/dataMock');

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

    // expect(APILocation).toHaveBeenCalledTimes(1);
    // Implementar um método para pegar as informações da API;
  });
});

describe('28 & 29 Generations', () => {
  afterEach(cleanup);

  test('The URL route is generations', async () => {
    const { getByText, history, queryAllByTestId } = renderWithRouter(<App />);

    const generation = getByText(/Generations/i);
    expect(generation).toBeInTheDocument();
    expect(generation.href).toBe('http://localhost/generations');

    fireEvent.click(generation);
    expect(history.location.pathname).toBe('/generations');
    expect(getByText(/Loading.../i)).toBeInTheDocument();

    await waitForDomChange();
    expect(queryAllByTestId(/generation/i).length).toBe(7);
  });

  const ELEMENTS_WITH_SAME_TEXT = 4;
  // itens with the text generation-i in the page /generations;

  for (let index = 0; index < ELEMENTS_WITH_SAME_TEXT; index += 1) {
    test('List generations, link and name of generations pokemons', async () => {
      const { getAllByText, history } = renderWithRouter(<App />, { route: '/generations' });

      await waitForDomChange();

      const generation = getAllByText(/Generations/i)[0];
      const generations = getAllByText(/generation-i/i);

      expect(generations[index]).toBeInTheDocument();
      fireEvent.click(generations[index]);

      expect(history.location.pathname).toBe(`/generations/${index + 1}`);
      fireEvent.click(generation);
    });
  }

  const ELEMENTS_WITH_SAME_TEXTS = 3;
  // itens with the text generation-v in the page /generations;

  for (let index = 0; index < ELEMENTS_WITH_SAME_TEXTS; index += 1) {
    test('List generations, link and name of generations pokemons', async () => {
      const { getAllByText, history } = renderWithRouter(<App />, { route: '/generations' });

      await waitForDomChange();

      const generation = getAllByText(/Generations/i)[0];
      const generations = getAllByText(/generation-v/i);

      expect(generations[index]).toBeInTheDocument();
      fireEvent.click(generations[index]);

      expect(history.location.pathname).toBe(`/generations/${index + 5}`);
      fireEvent.click(generation);
    });
  }
});
