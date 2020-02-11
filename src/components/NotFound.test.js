import React from 'react';
import { render, cleanup, fireEvent, getByRole, getAllByText, getByText } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import NotFound from './NotFound';
import MockTest, { pokemonsMock, isPokemonFavoriteByIdMock } from '../MockTests/MockTest';

afterEach(cleanup);

const pokeName = pokemonsMock.map(pokemon => pokemon.name);
const pokeTypes = pokemonsMock.map(pokemon => pokemon.type);
const pokeTypeFilter = pokeTypes.filter((pokemon, index) => pokeTypes.indexOf(pokemon) === index);

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom')
    return {
        ...originalModule,
        BrowserRouter: ({ children }) => (<div> {children} </div>),
    }
});

function renderWithRouter(
    ui,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
    return {
        ...render(<Router history={history}>{ui}</Router>),
        history,
    };
}

describe('Not Found', () => {
    // 22-01 22-02
    test('should display a Not Found page content', () => {
        const { queryAllByRole, getByText } = renderWithRouter(<NotFound />);
        const imgHTMLsrc = queryAllByRole('img').map(HTML => HTML.src);

        expect(getByText(/Page requested not found/i)).toBeInTheDocument();

        expect(imgHTMLsrc.includes('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif')).toBeTruthy();
    });
})
