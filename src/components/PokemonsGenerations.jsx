import React, { Component } from 'react';
import { apiGenerationsPokemons } from '../services/pokedexService';
import '../App.css';

export default class PokemonsGenerations extends Component {
  constructor(props) {
    super(props);
    this.state = { date: [], loading: true, url: [] };
  }

  componentDidMount() {
    apiGenerationsPokemons().then((values) => this.setState({
      date: values,
      loading: false,
    }));
  }

  render() {
    const { date, loading } = this.state;
    if (loading) return <h1>LOADING...</h1>;
    return (
      <div>
        <h1> Pokemons Generations </h1>
        <div>
          <div className="container">
            <h2>Click in generation</h2>
            {date.results.map(({ name }) => (
              <div data-testid="element-div" key={`value${name}`} className="div-for-generation">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
