import React, { Component } from 'react';
import Pokete from './Pokete';

class PokeAPILocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poke: [],
    };
  }

  async componentDidMount() {
    const POKE_API = 'https://pokeapi.co/api/v2/location/';
    const response = await fetch(POKE_API);
    const data = await response.json();
    this.setState({
      poke: data.results,
    });
  }

  render() {
    const { poke } = this.state;
    return (
      <div>
        <Pokete poker={poke} />
      </div>
    );
  }
}

export default PokeAPILocation;
