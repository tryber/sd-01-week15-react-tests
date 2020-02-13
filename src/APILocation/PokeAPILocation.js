import React, { Component } from 'react';
import ListLocation from './ListLocation';
// import getPokeAPILocation from '../services/getPokeAPILocation';

class PokeAPILocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poke: [],
      loading: true,
      next: 100,
      previous: -100,
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

  async nextList() {
    const { next, count, previous } = this.state;
    const POKE_API = `https://pokeapi.co/api/v2/location/?offset=${next}&limit=100`;
    const response = await fetch(POKE_API);
    const data = await response.json();

    this.setState((state) => ({
      next: state.next + 100,
      previous: previous + 100,
      poke: data.results,
      count: count + 1,
    }));
  }

  async previousList() {
    const { next, previous, count } = this.state;
    // const data = getPokeAPILocation(previous);

    const POKE_API = `https://pokeapi.co/api/v2/location/?offset=${previous}&limit=100`;
    const response = await fetch(POKE_API);
    const data = await response.json();

    this.setState({
      count: count - 1,
      next: next - 100,
      poke: data.results,
      previous: previous - 100,
    });
  }

  render() {
    const {
      poke, loading, previous,
    } = this.state;
    if (loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <h2>Locations Pokémons</h2>
        <button
          type="button"
          disabled={previous === -100}
          onClick={() => this.previousList()}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={previous === 600}
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
