import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGenerationPokemonAPI } from '../services/pokedexService';

export function id(url) {
  return url.split('generation/')[1];
}

class Generations extends Component {
  constructor(props) {
    super(props);
    this.state = { date: [], loading: true, url: [] };
  }

  componentDidMount() {
    getGenerationPokemonAPI().then((values) => this.setState({
      date: values,
      loading: false,
    }));
  }
  
  render() {
    const { date, loading } = this.state;
    if (loading) return <h1>LOADING...</h1>;
    console.log(date);
    return (
      <div>
        <h1> Pokemons Generations </h1>
        <div>
          <div className="container">
            <h2>Click in generation</h2>
            {date.results.map(({ name, url }) => (
              <div data-testid="element-div" key={`value${name}`} className="div-for-generation">
                <Link className="link" to={`/generation/${id(url)}`}>{name}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Generations;
