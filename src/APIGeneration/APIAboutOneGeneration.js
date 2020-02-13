import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListAboutOneGeneration from './ListAboutOneGeneration';

class APIAboutOneGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecies: [],
      nameGeneration: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const POKE_API = `https://pokeapi.co/api/v2/generation/${this.props.location.pathname.substr(-1)}`;
    const response = await fetch(POKE_API);
    const data = await response.json();
    this.setState({
      listSpecies: data.pokemon_species,
      nameGeneration: data.name,
      loading: false,
    });
  }

  render() {
    const { listSpecies, nameGeneration, loading } = this.state;
    if (loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <h2>{nameGeneration}</h2>
        <ListAboutOneGeneration generation={listSpecies} />
      </div>
    );
  }
}

export default APIAboutOneGeneration;

APIAboutOneGeneration.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
