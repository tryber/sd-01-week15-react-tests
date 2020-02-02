import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class Generation extends Component {
  render() {
    let { url } = this.props.generation;
    const { name } = this.props.generation;
    url = url.substr(-2, 1);

    return (
      <Link to={`/generations/${url}`}>
        <p>{name}</p>
      </Link>
    );
  }
}

export default Generation;

Generation.propTypes = {
  generation: PropTypes.objectOf(PropTypes.string).isRequired,
};
