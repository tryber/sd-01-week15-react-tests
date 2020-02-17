import React, { Component } from 'react';

import ListPokemonsLocation from './ListPokemonsLocation';

class PokeLocationAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokeResults: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const response = await fetch('https://pokeapi.co/api/v2/location/?offset=0&limit=100');
    const data = await response.json();
    this.setState({
      pokeResults: data.results,
      loading: true,
    });
  }

  render() {
    const { pokeResults } = this.state;
    return (
      <ListPokemonsLocation location={pokeResults} />
    );
  }
}

export default PokeLocationAPI;
