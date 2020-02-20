import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OneGeneration extends Component {
  render() {
    const { name } = this.props.generation;
    return (
      <div>
        <p data-testid="pokemon-species">{name}</p>
      </div>
    );
  }
}

export default OneGeneration;

OneGeneration.propTypes = {
  generation: PropTypes.objectOf(PropTypes.string).isRequired,
};
