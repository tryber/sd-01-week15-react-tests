import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Generation extends Component {
  render() {
    const { name } = this.props.generation;
    return (
      <div>
        <p>{name}</p>
      </div>
    );
  }
}

export default Generation;

Generation.propTypes = {
  generation: PropTypes.objectOf(PropTypes.string).isRequired,
};
