import React, { Component } from 'react';
import ListLocation from './ListLocation';

class PokeAPILocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poke: [],
      loading: true,
      next: 0,
    };
    console.log(this.state.next)
    this.nextList = this.nextList.bind(this);
    this.previousList = this.previousList.bind(this);
  }

  async componentDidMount() {
    const POKE_API = 'https://pokeapi.co/api/v2/location/?offset=0&limit=10';
    const response = await fetch(POKE_API);
    const data = await response.json();
    console.log(data)
    this.setState({
      poke: data.results,
      loading: false,
    });
  }

  nextList() {
    const { next } = this.state;
    this.setState({
      next: next + 10,
    });
    const POKE_API = `https://pokeapi.co/api/v2/location/?offset=${next}&limit=10`;
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
    const { next } = this.state;
    this.setState({
      next: next - 10,
    });
    const POKE_API = `https://pokeapi.co/api/v2/location/?offset=${next}&limit=10`;
    const response = await fetch(POKE_API);
    const data = await response.json();
    this.setState({
      poke: data.results,
      loading: false,
    });
  }

  render() {
    const { poke, loading } = this.state;
    if (loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <div>
          <h2>Locations Pokémons</h2>
          <ListLocation location={poke} />
        </div>
        <button type="button" onClick={() => this.previousList()}>Previous</button>
        <button type="button" onClick={() => this.nextList()}>Next</button>
      </div>
    );
  }
}

export default PokeAPILocation;
