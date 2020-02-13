import React, { Component } from 'react';
import { apiLocationPokemons } from '../services/pokedexService';

class PokemonsLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      count: 0,
      totalPokémons: 0,
    };
  }

  componentDidMount() {
    apiLocationPokemons().then((values) => this.setState({
      data: values.results,
      loading: false,
      totalPokémons: values.count,
    }));
    this.btnNext = this.btnNext.bind(this);
    this.bntPrevious = this.bntPrevious.bind(this);
    this.btnN = this.btnN.bind(this);
    this.btnP = this.btnP.bind(this);
  }

  async btnNext() {
    const { count } = this.state;
    await apiLocationPokemons(count).then((values) => this.setState({
      data: values.results,
      loading: false,
      count: count + 100,
    }));
  }

  async bntPrevious() {
    const { count } = this.state;
    await apiLocationPokemons(count).then((values) => this.setState({
      data: values.results,
      loading: false,
      count: count - 100,
    }));
  }

  btnP(count) {
    return (
      <button
        data-testid="btn-previous"
        type="button"
        disabled={count === -100 || count === 0}
        onClick={() => this.bntPrevious()}
      >
        Previous
      </button>
    );
  }

  btnN() {
    return (
      <button
        data-testid="btn-next"
        type="button"
        disabled={this.totalPokémons === null}
        onClick={() => this.btnNext()}
      >
        Next
      </button>
    );
  }

  render() {
    const { data, loading, count } = this.state;
    if (loading) return <h1>LOADING...</h1>;

    return (
      <div>
        <h1> Pokemons Location </h1>
        <div />
        <div>
          {this.btnP(count)}
          {this.btnN(count)}
        </div>
        <label htmlFor="container-p">
          Pokemons Locations for number 20
          {data.map(({ name }) => (
            <p data-testid="element-p" key={`number${name}`} className="container-p">
              {name}
            </p>
          ))}
        </label>
      </div>
    );
  }
}

export default PokemonsLocation;
