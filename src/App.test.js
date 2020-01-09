import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitForDomChange, fireEvent } from '@testing-library/react';
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

test('Pokédex should only display one Pokémon at a time.', () => {
  const { getAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  const pokemoncont = getAllByText(/Pokédex/i).length;
  expect(pokemoncont).toBe(1);
});

test("Testando proximo pokemon e testando pelo o id de cada, testando tambem ao chegar ao final se ele retornar ao primeiro pokemon", () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Próximo pokémon')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByTestId('4')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByTestId('10')).toBeInTheDocument();
  for (let cont = 1; cont < 8; cont += 1) {
    fireEvent.click(getByText('Próximo pokémon'));
  }
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test("Navegando pelos tipos de pokemon e simulando o click neles", () => {
  const { getAllByText, getByTestId, getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const type = 'Bug';
  const buttonType = getByTestId(`type-${type}`);
  expect(buttonType).toBeInTheDocument();
  fireEvent.click(buttonType);

  expect(getAllByText(type).length).toBe(2);
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getAllByText(type).length).toBe(2);
});

test("Testando o botao all, no pokedex, necessario o nome dele ser All e sua funcionalidade", () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Caterpie')).toBeInTheDocument();
  const type = 'Fire';
  const buttonType = getByTestId(`type-${type}`);
  fireEvent.click(buttonType);
  fireEvent.click(getByText('Próximo pokémon'));
  const allButton = getByText('All');
  fireEvent.click(allButton);
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Caterpie')).toBeInTheDocument();
});

test("7-botao proximo precisa ser desabilitado quando o type usado possui apenas um pokemon", () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const type = 'Bug';
  const buttonType = getByTestId(`type-${type}`);
  fireEvent.click(buttonType);
  expect(getByText('Próximo pokémon').disabled).toBe(true);
});


test("8-Pokedéx deve exibir o nome, tipo, peso médio e imagem do pokémon exibido", () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName.textContent).toBe('Pikachu')
  expect(getByTestId('pokemon-type')).toBeInTheDocument();
  expect(getByTestId('pokemon-type').textContent).toBe('Electric');
  expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
  expect(getByTestId('pokemon-img')).toBeInTheDocument();
  expect(getByTestId('pokemon-img').src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test("9- O pokémon exibido na Pokedéx deve conter um link de navegação para exibir detalhes deste pokémon", async () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const link = getByText('More details');
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
  await waitForDomChange();
  console.log('foi');
});
