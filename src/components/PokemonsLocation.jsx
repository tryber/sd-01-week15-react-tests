import React, { Component } from 'react';
import { apiLocationPokemons } from '../services/pokedexService';

class PokemonsLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [],
      loading: true,
      count: 0,
    };
  }

  componentDidMount() {
    apiLocationPokemons().then((values) => this.setState({
      date: values.results,
      loading: false,
    }));
    this.btnNext = this.btnNext.bind(this);
    this.bntPrevious = this.bntPrevious.bind(this);
  }

  async btnNext() {
    const { count } = this.state;
    await apiLocationPokemons(count).then((values) => this.setState({
      date: values.results,
      loading: false,
      count: count + 100,
    }));
  }

  async bntPrevious() {
    const { count } = this.state;
    await apiLocationPokemons(count).then((values) => this.setState({
      date: values.results,
      loading: false,
      count: count - 100,
    }));
  }

  render() {
    const { date, loading, count } = this.state;
    if (loading) return <h1>LOADING...</h1>;

    return (
      <div>
        <h1> Pokemons Location </h1>
        <div>
          <button
            data-testid="btn-previous"
            type="button"
            disabled={count === -100 || count === 0}
            onClick={() => this.bntPrevious()}
          >
            Previous
          </button>
          <button
            data-testid="btn-next"
            type="button"
            disabled={count === 600}
            onClick={() => this.btnNext()}
          >
            Next
          </button>
        </div>
        <label htmlFor="container-p">
          Pokemons Locations for number 20
          {date.map(({ name }, ind) => (
            <p data-testid="element-p" key={ind} className="container-p">
              {name}
            </p>
          ))}
        </label>
      </div>
    );
  }
}

export default PokemonsLocation;
