import React from 'react';
import { render } from '@testing-library/react';
import About from './About';

describe('about testing suite', () => {
  describe('21 - about page has info about pokedéx', () => {
    it('has a h2 tag containing text About Pokédex', () => {
      const { getByText } = render(
        <About />,
      );
      const heading2 = getByText(/about pokédex/i);
      expect(heading2.tagName).toBe('H2');
    });
    it('has 2 paragraphs containing detailed text about pokes', () => {
      const { getAllByText } = render(
        <About />,
      );
      const texts = getAllByText(/.*/i);
      const paragraphs = texts.filter((paragraph) => paragraph.tagName === 'P');
      expect(paragraphs[0].innerHTML).toBe('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons ');
      expect(paragraphs[1].innerHTML).toBe('One can filter Pokémons by type, and see more details for each one of them');
    });
    it('has one image of a pokedex', () => {
      const { container } = render(
        <About />,
      );
      const image = container.querySelector('img');
      expect(image).toHaveProperty('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
  });
});
