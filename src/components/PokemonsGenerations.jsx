import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    console.log(date.results);
    if (loading) return <h1>LOADING...</h1>;
    return (
      <div>
        <h1> Pokemons Generations </h1>
        <div>
          <div className="container">
            <h2>Click in generation</h2>
            {date.results.map(({ name, url }, ind) => (
              <Link to={`${url}`}>
                <div data-testid="element-p" key={ind} className="div-for-generation">
                  {name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
