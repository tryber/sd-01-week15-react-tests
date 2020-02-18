import React, { Component } from 'react';
import { apiLocationPokemons } from '../services/pokedexService';

class PokemonsLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      counter: 0,
      maxOfLengthTheAPI: 0,
    };
  }

  componentDidMount() {
    apiLocationPokemons().then((values) => this.setState({
      data: values.results,
      loading: false,
      maxOfLengthTheAPI: Math.round(values.count / 100) * 100,
    }));
    this.btnNext = this.btnNext.bind(this);
    this.bntPrevious = this.bntPrevious.bind(this);
    this.btnN = this.btnN.bind(this);
    this.btnP = this.btnP.bind(this);
  }

  async btnNext() {
    const { counter, maxOfLengthTheAPI } = this.state;

    await apiLocationPokemons(counter).then((values) => {
      this.setState({
        data: values.results,
        loading: false,
        counter: counter >= maxOfLengthTheAPI - 100 ? maxOfLengthTheAPI : counter + 100,
      });
    });
  }

  async bntPrevious() {
    const { counter } = this.state;
    await apiLocationPokemons(counter).then((values) => {
      this.setState({
        data: values.results,
        loading: false,
        counter: counter - 100,
      });
    });
  }

  btnP(condition) {
    return (
      <button
        data-testid="btn-previous"
        type="button"
        disabled={condition === 0}
        onClick={() => this.bntPrevious()}
      >
        Previous
      </button>
    );
  }

  btnN(condition, stoper) {
    return (
      <button
        data-testid="btn-next"
        type="button"
        disabled={condition === stoper}
        onClick={() => this.btnNext()}
      >
        Next
      </button>
    );
  }

  render() {
    const {
      data, loading, maxOfLengthTheAPI, counter,
    } = this.state;

    if (loading) return <h1>LOADING...</h1>;

    return (
      <div>
        <h1> Pokemons Location </h1>
        <div />
        <div>
          {this.btnP(counter)}
          {this.btnN(counter, maxOfLengthTheAPI)}
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
