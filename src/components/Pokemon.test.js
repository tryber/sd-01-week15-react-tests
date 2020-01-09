import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, getByText, fireEvent, waitForDomChange } from '@testing-library/react';
import Pokemon from './Pokemon';

test.skip('test if by clicking next button, it displays the next pokemon in the list', () => {
  const { queryByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Pokemon />
    </MemoryRouter>,
  );
  const oldPoke = queryByText(/Average\ weight/i).previousSibling.previousSibling.innerHTML;
  console.log(oldPoke);

  fireEvent.click(queryByText('Próximo pokémon'));

  const newPoke = queryByText(/Average weight/i).previousSibling.previousSibling.innerHTML;
  console.log(newPoke);

  expect(oldPoke).not.toBe(newPoke);
});
