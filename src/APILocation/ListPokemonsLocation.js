import React, { Component } from 'react';
import Location from './Location';

class ListPokemonsLocation extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        {location.map((pokemon) => <Location location={pokemon} key={pokemon.name} />)}
      </div>
    );
  }
}

export default ListPokemonsLocation;
