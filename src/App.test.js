import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, getByText, fireEvent, container } from '@testing-library/react';
import App from './App';

test.skip('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test.skip('shows the Pokedéx when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test.skip('ensures only one pokemón is rendered', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const query = container.querySelectorAll('.pokemon');
  expect(query.length).toBe(1);
});

test.skip('test if by clicking next button, it displays the next pokemon in the list', () => {
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

test.skip('check if the pokedex returns to the first pokemon when button is pressed at the last one', () => {
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
