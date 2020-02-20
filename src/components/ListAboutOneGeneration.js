import React from 'react';
import PropTypes from 'prop-types';
import OneGeneration from './OneGeneration';

class ListAboutOneGeneration extends React.Component {
  render() {
    const { generation } = this.props;
    return (
      <div>
        {generation.map((pokemon) => <OneGeneration generation={pokemon} key={pokemon.name} />)}
      </div>
    );
  }
}

export default ListAboutOneGeneration;

ListAboutOneGeneration.propTypes = {
  generation: PropTypes.arrayOf(PropTypes.object).isRequired,
};
