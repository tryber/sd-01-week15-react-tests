import React, { Component } from 'react';
import './generations.css';

class Generations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
    };
    this.fetchPokeGenerations = this.fetchPokeGenerations.bind(this);
    this.generateContent = this.generateContent.bind(this);
  }


  componentDidMount() {
    this.fetchPokeGenerations();
  }

  async fetchPokeGenerations() {
    let { match: { params: { id } } } = this.props;
    if (id === undefined) {
      id = '';
    }
    const URL = `https://pokeapi.co/api/v2/generation/${id}`;
    if (id === '') {
      await fetch(URL)
        .then((response) => response.json())
        .then(({ results }) => (
          results.map(({ name, url }) => (
            this.setState((state) => ({ table: [...state.table, [name, url]] }))))));
    } else {
      await fetch(URL)
        .then((response) => response.json())
        .then(({ pokemon_species }) => (
          pokemon_species.map(({ name, url }) => (
            this.setState((state) => ({ table: [...state.table, [name, url]] }))))));
    }
  }

  generateContent() {
    const { table } = this.state;
    return table.map(([name, url]) => (
      <li key={url}>
        Name:
        {name}
        /  URL:
        <a href={`/generations/${Number(table.findIndex((item) => item.includes(url))) + 1}`}>{url}</a>
      </li>
    ));
  }

  render() {
    return (
      <div className="generations-container">
        <h1>Generations</h1>
        <ul>
          {this.generateContent()}
        </ul>
      </div>
    );
  }
}

export default Generations;
