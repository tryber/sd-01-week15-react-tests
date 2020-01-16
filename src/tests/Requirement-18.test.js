import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Exigência → 18', () => {
  test(`Ao clicar no link "Home" na barra de navegação, a aplicação
   deve ser redirecionada para a página inicial, na URL "/"`, () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('Home'));
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
