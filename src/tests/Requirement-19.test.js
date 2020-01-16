import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Exigência → 19', () => {
  test(`Ao clicar no link "About" na barra de navegação, a aplicação
   deve ser redirecionada para a página de About, na URL "/about"`, () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('About'));
    const sobre = getByText('About Pokédex');
    expect(sobre).toBeInTheDocument();
  });
});
