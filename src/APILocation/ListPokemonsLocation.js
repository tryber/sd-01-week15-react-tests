import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Location from './Location';

class ListPokemonsLocation extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        {location.map((pokemon) => <Location key={pokemon.name} location={pokemon} />)}
      </div>
    );
  }
}

export default ListPokemonsLocation;

ListPokemonsLocation.propTypes = {
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
};
