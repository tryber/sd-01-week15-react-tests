import React, { Component } from 'react';
import ListGeneration from './ListGeneration';

class PokeAPIGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listGeneration: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const response = await fetch('https://pokeapi.co/api/v2/generation/');
    const data = await response.json();
    this.setState({
      listGeneration: data.results,
      loading: false,
    });
  }

  render() {
    const { listGeneration, loading } = this.state;
    if (loading) return <h2>Loading...</h2>;

    return (
      <div>
        <h2>Generations Pokémons</h2>
        <ListGeneration generation={listGeneration} />
      </div>
    );
  }
}

export default PokeAPIGeneration;
