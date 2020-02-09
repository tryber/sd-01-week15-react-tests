import React, { Component } from 'react';
import apiLocationPokemons from '../locationAPI/API';

class PokemonsLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { date: null };
  }

  componentDidMount() {
    apiLocationPokemons().then((values) => this.setState({
      date: values,
    }));
  }

  render() {
    const { date } = this.state;
    console.log(date);
    return (
      <div>
        <h1> Pokemons Location </h1>
      </div>
    );
  }
}

export default PokemonsLocation;
