import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';

class ListLocation extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        {location.map((pokemon) => <Location location={pokemon} key={pokemon.name} />)}
      </div>
    );
  }
}

export default ListLocation;

ListLocation.propTypes = {
  location: PropTypes.arrayOf(PropTypes.object).isRequired,
};
