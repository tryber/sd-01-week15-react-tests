import React, { Component } from 'react';
import ListLocation from './ListLocation';

class PokeAPILocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poke: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const POKE_API = 'https://pokeapi.co/api/v2/location/';
    const response = await fetch(POKE_API);
    const data = await response.json();
    this.setState({
      poke: data.results,
      loading: false,
    });
  }

  render() {
    const { poke, loading } = this.state;
    if (loading) return <div>Carregando...</div>
    return (
      <div>
        <h2>Locations Pokémons</h2>
        <ListLocation poker={poke} />
      </div>
    );
  }
}

export default PokeAPILocation;
