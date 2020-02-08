import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('Exigência → 17', () => {
  test('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const home = getByText('Home');
    const about = getByText('About');
    const favorite = getByText('Favorite Pokémons');
    expect(home && about && favorite).toBeInTheDocument();
    expect(home.href).toBe('http://localhost/');
    expect(about.href).toBe('http://localhost/about');
    expect(favorite.href).toBe('http://localhost/favorites');
  });
});
