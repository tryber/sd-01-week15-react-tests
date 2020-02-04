import React, { Component } from 'react';
import ListLocation from './ListLocation';

class PokeAPILocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poke: [],
      loading: true,
      next: 0,
      count: 0,
    };
    this.nextList = this.nextList.bind(this);
    this.previousList = this.previousList.bind(this);
  }

  async componentDidMount() {
    const POKE_API = 'https://pokeapi.co/api/v2/location/?offset=0&limit=100';
    const response = await fetch(POKE_API);
    const data = await response.json();
    this.setState({
      poke: data.results,
      loading: false,
    });
  }

  nextList() {
    const { next, count } = this.state;
    this.setState({
      next: next + 100,
      count: count + 1,
    });
    const POKE_API = `https://pokeapi.co/api/v2/location/?offset=${next}&limit=100`;
    fetch(POKE_API)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          poke: data.results,
          loading: false,
        });
      });
  }

  async previousList() {
    const { next, count } = this.state;
    this.setState({
      next: next - 100,
      count: count - 1,
    });
    const POKE_API = `https://pokeapi.co/api/v2/location/?offset=${next}&limit=100`;
    const response = await fetch(POKE_API);
    const data = await response.json();
    this.setState({
      poke: data.results,
      loading: false,
    });
  }

  render() {
    const {
      poke, loading, next, count,
    } = this.state;
    if (loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <h2>Locations Pokémons</h2>
        <button
          type="button"
          disabled={next === 0}
          onClick={() => this.previousList()}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={count === 7}
          onClick={() => this.nextList()}
        >
          Next
        </button>
        <ListLocation location={poke} />
      </div>
    );
  }
}

export default PokeAPILocation;
