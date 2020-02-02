import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';

class ListLocation extends React.Component {
  render() {
    const { poker } = this.props;
    return (
      <div>
        {poker.map((pokemon) => <Location location={pokemon} key={pokemon.name} />)}
      </div>
    );
  }
}

export default ListLocation;

ListLocation.propTypes = {
  poker: PropTypes.arrayOf(PropTypes.object).isRequired,
};
