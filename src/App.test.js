import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => (<div>{children}</div>),
  };
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

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

describe('App component test suite', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokedéx when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('ensures only one pokemón is rendered', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const query = container.querySelectorAll('.pokemon');
    expect(query.length).toBe(1);
  });

  it('test if by clicking next button, it displays the next pokemon in the list', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const oldPoke = queryByText(/Average weight/i).previousSibling.previousSibling.innerHTML;
    fireEvent.click(queryByText('Próximo pokémon'));
    const newPoke = queryByText(/Average weight/i).previousSibling.previousSibling.innerHTML;

    expect(oldPoke).not.toBe(newPoke);
  });

  it('check if the pokedex returns to the first pokemon when button is pressed at the last one', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const oldPoke = queryByText(/Average weight/i).previousSibling.previousSibling.innerHTML;

    fireEvent.click(queryByText('Próximo pokémon'));

    let newPoke = queryByText(/Average weight/i).previousSibling.previousSibling.innerHTML;

    const pokeList = [oldPoke];
    while (oldPoke !== newPoke) {
      fireEvent.click(queryByText('Próximo pokémon'));
      newPoke = queryByText(/Average weight/i).previousSibling.previousSibling.innerHTML;
      if (newPoke === undefined) {
        return null;
      }
      pokeList.push(newPoke);
    }

    return expect(oldPoke).toBe(newPoke);
  });

  it('check if filter works', () => {
    const { queryByText, container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const actualCategory = () => (queryByText(/Average weight/i).previousSibling.innerHTML);

    const buttonNextPoke = queryByText(/Próximo pokémon/i);

    const goToNextPoke = () => {
      if (buttonNextPoke.disabled) return undefined;
      return fireEvent.click(buttonNextPoke);
    };

    const buttons = container.querySelectorAll('.button-text.filter-button');
    const categories = ['Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon'];

    const categoriesButtons = Array(buttons).filter((button) => (
      categories.map((category) => (button.innerHTML === category))));

    const buttonElectric = () => (fireEvent.click(categoriesButtons[0][1]));
    const buttonFire = () => (fireEvent.click(categoriesButtons[0][2]));
    const buttonBug = () => (fireEvent.click(categoriesButtons[0][3]));
    const buttonPoison = () => (fireEvent.click(categoriesButtons[0][4]));
    const buttonPsychic = () => (fireEvent.click(categoriesButtons[0][5]));
    const buttonNormal = () => (fireEvent.click(categoriesButtons[0][6]));

    const randomTimesNextStep = () => {
      for (let i = 0; i < Math.floor(Math.random() * 10); i += 1) goToNextPoke();
    };

    const filterTest = (callback) => {
      callback();
      const category = actualCategory();
      randomTimesNextStep();
      expect(category).toBe(actualCategory());
    };

    filterTest(buttonFire);
    filterTest(buttonElectric);
    filterTest(buttonBug);
    filterTest(buttonPsychic);
    filterTest(buttonPoison);
    filterTest(buttonNormal);
  });

  it('5 - check reset filter button functionality', () => {
    const { getByText, queryByText, container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const actualCategory = () => (queryByText(/Average weight/i).previousSibling.innerHTML);
    const buttonNextPoke = queryByText(/Próximo pokémon/i);

    const goToNextPoke = () => {
      if (buttonNextPoke.disabled) return undefined;
      return fireEvent.click(buttonNextPoke);
    };

    const buttons = container.querySelectorAll('.button-text.filter-button');
    const categories = ['Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon'];

    const categoriesButtons = Array(buttons).filter((button) => (
      categories.map((category) => (button.innerHTML === category))));

    const clickButtonBug = () => (fireEvent.click(categoriesButtons[0][3]));

    const buttonAll = getByText(/All/i);
    const clickButtonAll = () => fireEvent.click(buttonAll);

    const testFilterAll = () => {
      const defaultCategory = actualCategory();
      clickButtonBug();
      clickButtonAll();
      while (defaultCategory === actualCategory()) goToNextPoke();
      expect(defaultCategory).not.toBe(actualCategory());
    };

    testFilterAll();
  });

  it('5 - check if "All" filter is default', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const actualCategory = () => (queryByText(/Average weight/i).previousSibling.innerHTML);
    const buttonNextPoke = queryByText(/Próximo pokémon/i);

    const goToNextPoke = () => {
      if (buttonNextPoke.disabled) return undefined;
      return fireEvent.click(buttonNextPoke);
    };

    const testFilterAll = () => {
      const defaultCategory = actualCategory();
      while (defaultCategory === actualCategory()) goToNextPoke();
      expect(defaultCategory).not.toBe(actualCategory());
    };

    testFilterAll();
  });

  it('7 - next pokemon button should be disable if filtered pokes equals 1', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const actualCategory = () => (queryByText(/Average weight/i).previousSibling.innerHTML);
    const oldPoke = queryByText(/Average weight/i).previousSibling.previousSibling.innerHTML;
    fireEvent.click(queryByText('Próximo pokémon'));

    let newPoke = queryByText(/Average weight/i).previousSibling.previousSibling.innerHTML;
    const pokeList = [];

    const getPokeList = () => {
      pokeList.push([newPoke, actualCategory()]);
      while (oldPoke !== newPoke) {
        fireEvent.click(queryByText('Próximo pokémon'));
        newPoke = queryByText(/Average weight/i).previousSibling.previousSibling.innerHTML;
        if (newPoke === undefined) {
          return null;
        }
        pokeList.push([newPoke, actualCategory()]);
      }
      return pokeList;
    };

    getPokeList();

    const buttonNextPoke = queryByText(/Próximo pokémon/i);

    const lonePokes = pokeList.filter(([, poke]) => {
      const oneOfAKindPoke = pokeList.filter((thisPokemon) => thisPokemon.includes(poke));
      if (oneOfAKindPoke.length === 1) return oneOfAKindPoke;
      return undefined;
    });

    const categories = lonePokes.map((category) => category[1]);
    categories.forEach((category) => {
      fireEvent.click(getByText(category));
      expect(buttonNextPoke.disabled).toBeTruthy();
    });
  });

  it('10 - poke url navigates to deatils page', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const url = getByText('More details');
    fireEvent.click(url);
    expect(container.innerHTML).toMatch(`${pokemon.name} Details`);
  });

  it('11 - details has correct pokemon info', () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const url = getByText('More details');
    fireEvent.click(url);

    const { averageWeight: { measurementUnit, value } } = pokemon;
    const title = getByText(`${pokemon.name} Details`);
    const avgWeight = getByText(/Average weight/i);
    const pokeImg = container.querySelector('img');
    const pokeType = getByText(/^Electric$/g);

    expect(pokeType.innerHTML).toMatch(pokemon.type);
    expect(title.innerHTML).toBe(`${pokemon.name} Details`);
    expect(avgWeight.innerHTML).toEqual(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImg).toHaveProperty('src', pokemon.image);
    expect(pokeImg).toHaveProperty('alt', `${pokemon.name} sprite`);
  });

  it('12 - details page has not another detail link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const url = getByText(/^More details$/g);
    fireEvent.click(url);
    expect(() => fireEvent.click(getByText(/^More details$/g))).toThrow();
  });

  it('13 - details page contains summary paragraph', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const url = getByText(/^More details$/g);
    fireEvent.click(url);

    const summary = getByText(/^Summary$/g);
    expect(summary.innerHTML).toContain('Summary');
    expect(summary.tagName).toBe('H2');

    const descriptionP = summary.nextElementSibling;
    expect(descriptionP).not.toBeUndefined();
    expect(descriptionP.innerHTML).toContain('Pokémon');
  });

  it('14 - details page contains detailed map location', () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const url = getByText(/^More details$/g);
    fireEvent.click(url);

    const summary = getByText(/Game Locations of/g);
    expect(summary.innerHTML).toContain(`Game Locations of ${pokemon.name}`);
    expect(summary.tagName).toBe('H2');

    const locationDetails = summary.nextElementSibling;
    expect(locationDetails.tagName).toBe('DIV');
    expect(locationDetails.className).toBe('pokemon-habitat');

    const mapImage = container.querySelectorAll('img');
    expect(mapImage[1]).toHaveProperty('src', pokemon.foundAt[0].map);
    expect(mapImage[2]).toHaveProperty('src', pokemon.foundAt[1].map);
    expect(mapImage[1]).toHaveProperty('alt', `${pokemon.name} location`);
    expect(mapImage[2]).toHaveProperty('alt', `${pokemon.name} location`);

    pokemon.foundAt.forEach((item) => expect(getByText(`${item.location}`)).toBeInTheDocument);
  });

  it('15 - check if favorite button is correctly labeled and works appropriately', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const url = getByText(/^More details$/g);
    fireEvent.click(url);

    const favoriteLabel = getByLabelText(/Pokémon favoritado/g, {
      selector: 'input',
    });

    if (favoriteLabel.checked === false) {
      fireEvent.click(favoriteLabel);
    }

    expect(localStorage.getItem('favoritePokemonIds')).toBe(`[${pokemon.id}]`);

    if (favoriteLabel.checked === true) {
      fireEvent.click(favoriteLabel);
    }

    expect(localStorage.getItem('favoritePokemonIds')).not.toBe(`[${pokemon.id}]`);
  });

  it('16 - favorited pokemons displays an image icon besides them', () => {
    const { getByText, getByLabelText, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const url = getByText(/^More details$/g);
    fireEvent.click(url);

    const favoriteLabel = getByLabelText(/Pokémon favoritado/g, {
      selector: 'input',
    });

    if (favoriteLabel.checked === false) {
      fireEvent.click(favoriteLabel);
    }
    const markedFavorite = getByAltText(/.* is marked as favorite/i, {
      selector: 'img',
    });

    expect(markedFavorite).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });

  it('17 - check nav bar links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText(/Home/i);
    const aboutLink = getByText(/About/i);
    const favoritesLink = getByText(/Favorite Pokémons/i);

    expect(homeLink).toHaveProperty('href', 'http://localhost/');
    expect(aboutLink).toHaveProperty('href', 'http://localhost/about');
    expect(favoritesLink).toHaveProperty('href', 'http://localhost/favorites');
  });

  it('18 - check if linking is working for Home', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );
    const homeLink = getByText(/Home/i);
    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe('/');
  });

  it('19 - check if linking is working for About', () => {
    const { history, getByText } = renderWithRouter(
      <App />,
    );
    const aboutLink = getByText(/About/i);
    fireEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('20 - check if linking is working for Favorite Pokemons', () => {
    const { history, getByText } = renderWithRouter(
      <App />,
    );

    const favoritesLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('23 - if the user types in an unknown url, page not found is displayed', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={['/blauealfb']}>
        <App />
      </MemoryRouter>,
    );

    const h2Header = getByText(/page requested not found/ig);
    expect(h2Header.tagName).toBe('H2');
    expect(h2Header.innerHTML).toBe('Page requested not found<span role="img" aria-label="Crying emoji"> 😭 </span>');

    const tlImage = container.querySelector('img');
    expect(tlImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

  it('25.1 - shows the Locations page when the route is `/locations`', () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/locations']}>
        <App />
      </MemoryRouter>,
    );

    expect(getAllByText(/locations/i)[1]).toBeInTheDocument();
    expect(getAllByText(/locations/i)[1].tagName).toBe('H1');
  });

  it('26 - link contains "location" text and takes user to locations page', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );

    const locationsLink = getByText(/location/i);
    expect(locationsLink.tagName).toBe('A');

    fireEvent.click(locationsLink);
    expect(history.location.pathname).toBe('/locations');
  });

  it('28.1 - shows the Generations page when the route is `/locations`', () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/generations']}>
        <App />
      </MemoryRouter>,
    );

    expect(getAllByText(/generations/i)[1]).toBeInTheDocument();
    expect(getAllByText(/generations/i)[1].tagName).toBe('H1');
  });

  it('29 - link contains "generation" text and takes user to locations page', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );

    const generationsLink = getByText(/generations/i);
    expect(generationsLink.tagName).toBe('A');

    fireEvent.click(generationsLink);
    expect(history.location.pathname).toBe('/generations/');
  });
});
