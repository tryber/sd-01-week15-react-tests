import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Poke extends Component {
  render() {
    const { name } = this.props.location;
    return (
      <div>
        <p>{name}</p>
      </div>
    );
  }
}

export default Poke;

Poke.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
