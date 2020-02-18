import React, { Component } from 'react';

import ListPokemonsLocation from './ListPokemonsLocation';

class PokeLocationAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      nextPage: 100,
      previousPage: -100,
      pokeResults: [],
    };
    this.nextList = this.nextList.bind(this);
    this.previousList = this.previousList.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('https://pokeapi.co/api/v2/location/?offset=0&limit=100');
    const data = await response.json();
    this.setState({
      pokeResults: data.results,
      loading: false,
    });
  }

  async nextList() {
    const { nextPage, count, previousPage } = this.state;
    const response = await fetch(`https://pokeapi.co/api/v2/location/?offset=${nextPage}&limit=100`);
    const data = await response.json();

    this.setState((state) => ({
      count: count + 1,
      nextPage: state.nextPage + 100,
      previousPage: previousPage + 100,
      pokeResults: data.results,
    }));
  }

  async previousList() {
    const { nextPage, previousPage, count } = this.state;
    const response = await fetch(`https://pokeapi.co/api/v2/location/?offset=${previousPage}&limit=100`);
    const data = await response.json();

    this.setState({
      count: count - 1,
      nextPage: nextPage - 100,
      previousPage: previousPage - 100,
      pokeResults: data.results,
    });
  }

  render() {
    const { pokeResults, loading, previousPage } = this.state;
    if (loading) return <h2>Loading...</h2>;

    return (
      <div>
        <h2>Locations Pokémons</h2>
        <button
          type="button"
          disabled={previousPage === -100}
          onClick={() => this.previousList()}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={previousPage === 600}
          onClick={() => this.nextList()}
        >
          Next
        </button>
        <ListPokemonsLocation location={pokeResults} />
      </div>
    );
  }
}

export default PokeLocationAPI;
