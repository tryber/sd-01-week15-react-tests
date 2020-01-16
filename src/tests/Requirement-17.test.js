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
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Home').href).toBe('http://localhost/' || '/');
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('About').href).toBe('http://localhost/about' || '/about');
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons').href).toBe('http://localhost/favorites' || '/favorites');
  });
});
