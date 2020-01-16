import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Exigência → 21', () => {
  test('A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <About />
      </MemoryRouter>,
    );
    const link = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const text = 'About Pokédex';
    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(text).tagName).toBe('H2');
    expect(getByText(text).nextSibling.firstChild.tagName).toBe('P');
    expect(getByText(text).nextSibling.firstChild.nextSibling.tagName).toBe('P');
    expect(getByText(text).nextSibling.firstChild.nextSibling.nextSibling.src).toBe(link);
  });
});
