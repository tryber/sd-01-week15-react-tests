import React from 'react';
import PropTypes from 'prop-types';
import Poke from './Poke';

class Pokete extends React.Component {
  render() {
    const { poker } = this.props;
    return (
      <div>
        {poker.map((pokemon) => <Poke location={pokemon} key={pokemon.name} />)}
      </div>
    );
  }
}

export default Pokete;

Pokete.propTypes = {
  poker: PropTypes.arrayOf(PropTypes.object).isRequired,
};
