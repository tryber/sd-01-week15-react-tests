import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, getByText, fireEvent, container } from '@testing-library/react';
import App from './App';

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

const isFavorite = true;

function setIsPokemonFavoriteById() {
  const favoritePokemonIds = readFavoritePokemonIds();
  const isPokemonFavorite = pokemon.reduce((acc, poke) => {
    acc[poke.id] = favoritePokemonIds.includes(poke.id);
    return acc;
  }, {});
  return isPokemonFavorite;
}
describe('App component test suite', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokedéx when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('ensures only one pokemón is rendered', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const query = container.querySelectorAll('.pokemon');
    expect(query.length).toBe(1);
  });

  test('test if by clicking next button, it displays the next pokemon in the list', () => {
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

  test('check if the pokedex returns to the first pokemon when button is pressed at the last one', () => {
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

    expect(oldPoke).toBe(newPoke);
  });

  test('check if filter works', () => {
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
    const { getByText, queryByText } = render(
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
    const { getByText, queryByText, container } = render(
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
      const oneOfAKindPoke = pokeList.filter((pokemon) => pokemon.includes(poke));
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
    const { getByText, container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const url = getByText(/^More details$/g);
    fireEvent.click(url);
    expect(() => fireEvent.click(getByText(/^More details$/g))).toThrow();
  });

  it('13 - details page contains summary paragraph', () => {
    const { getByText, container } = render(
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
});
