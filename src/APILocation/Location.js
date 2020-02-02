import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Location extends Component {
  render() {
    const { name } = this.props.location;
    return (
      <div>
        <p>{name}</p>
      </div>
    );
  }
}

export default Location;

Location.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
