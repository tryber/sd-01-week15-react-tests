
import React from 'react';
import PropTypes from 'prop-types';
import Generation from './Generation';

class ListGeneration extends React.Component {
  render() {
    const { generation } = this.props;
    return (
      <div>
        {generation.map((pokemon) => <Generation generation={pokemon} key={pokemon.name} />)}
      </div>
    );
  }
}

export default ListGeneration;

ListGeneration.propTypes = {
  generation: PropTypes.arrayOf(PropTypes.object).isRequired,
};
