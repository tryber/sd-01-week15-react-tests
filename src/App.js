import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import Locations from './components/Locations';
import Generations from './components/Generations';

import {
  About,
  FavoritePokemons,
  NotFound,
  Pokedex,
  PokemonDetails,
} from './components';

import {
  readFavoritePokemonIds,
  updateFavoritePokemons,
} from './services/pokedexService';

import pokemons from './data';

import './App.css';

class App extends Component {
  static setIsPokemonFavoriteById() {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});

    return isPokemonFavorite;
  }

  constructor(props) {
    super(props);
    this.state = { isPokemonFavoriteById: App.setIsPokemonFavoriteById() };
    this.renderRoutes = this.renderRoutes.bind(this);
  }

  onUpdateFavoritePokemons(pokemonId, isFavorite) {
    updateFavoritePokemons(pokemonId, isFavorite);

    this.setState(({ isPokemonFavoriteById: App.setIsPokemonFavoriteById() }));
  }

  renderPokedex() {
    const { isPokemonFavoriteById } = this.state;

    return (
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isPokemonFavoriteById}
      />
    );
  }

  renderPokemonDetails(match) {
    const { isPokemonFavoriteById } = this.state;

    return (
      <PokemonDetails
        isPokemonFavoriteById={isPokemonFavoriteById}
        match={match}
        pokemons={pokemons}
        onUpdateFavoritePokemons={(pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        )}
      />
    );
  }

  renderRoutes() {
    const { isPokemonFavoriteById } = this.state;
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);

    return (
      <Switch>
        <Route exact path="/" render={({ match }) => this.renderPokedex(match)} />
        <Route exact path="/generations/:id" component={Generations} />
        <Route
          path="/pokemons/:id"
          render={({ match }) => this.renderPokemonDetails(match)}
        />
        <Route path="/favorites" render={() => <FavoritePokemons pokemons={favoritePokemons} />} />
        <Route path="/about" component={About} />
        <Route path="/locations" component={Locations} />
        <Route path="/generations/" component={Generations} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Pokédex</h1>
        <nav>
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/about">About</Link>
          <Link className="link" to="/favorites">Favorite Pokémons</Link>
          <Link className="link" to="/locations/">Locations</Link>
          <Link className="link" to="/generations/">Generations</Link>
        </nav>
        {this.renderRoutes()}
      </div>
    );
  }
}

export default App;
