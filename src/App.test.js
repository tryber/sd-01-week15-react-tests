import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, getByText, fireEvent, waitForDomChange } from '@testing-library/react';
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
