import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from './About';

test('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <About />
    </MemoryRouter>,
  );
  expect(getByText('About Pokédex')).toBeInTheDocument();
  expect(getByText('About Pokédex').tagName).toBe('H2');
  expect(getByText('About Pokédex').nextSibling.firstChild.tagName).toBe('P');
  expect(getByText('About Pokédex').nextSibling.firstChild.nextSibling.tagName).toBe('P');
  expect(getByText('About Pokédex').nextSibling.firstChild.nextSibling.nextSibling.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
