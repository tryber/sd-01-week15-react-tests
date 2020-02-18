import React, { Component } from 'react';
import './locations.css';

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      limit: 20,
      offset: 0,
    };
    this.fetchPokeLocations = this.fetchPokeLocations.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.prevButtonControler = this.prevButtonControler.bind(this);
    this.nextButtonController = this.nextButtonController.bind(this);
  }

  componentDidMount() {
    this.fetchPokeLocations();
  }

  fetchPokeLocations() {
    const { limit, offset } = this.state;
    const URL = `https://pokeapi.co/api/v2/location/?limit=${limit}&offset=${offset}`;
    fetch(URL)
      .then((response) => response.json())
      .then(({ results }) => (
        results.map(({ name, url }) => (
          this.setState((state) => ({ table: [...state.table, [name, url]] }))))));
  }

  nextPage() {
    this.setState({ table: [] }, () => {
      this.setState((state) => ({ offset: state.offset + 20 }),
        () => this.fetchPokeLocations());
    });
  }

  previousPage() {
    this.setState({ table: [] }, () => {
      this.setState((state) => ({ offset: state.offset - 20 }),
        () => this.fetchPokeLocations());
    });
  }

  prevButtonControler() {
    const { offset } = this.state;
    if (offset === 0) {
      return true;
    }
    return false;
  }

  nextButtonController() {
    const { offset } = this.state;
    if (offset === 780) {
      return true;
    }
    return false;
  }

  render() {
    const generateContent = () => {
      const { table } = this.state;
      return table.map(([name, url]) => (
        <li key={url}>
          {`Name: ${name}  /  URL: ${url}`}
        </li>
      ));
    };

    const { limit, offset } = this.state;
    return (
      <div className="locations-container">
        <h1>Locations</h1>
        <ul>
          {generateContent()}
        </ul>
        <div className="button-container">
          <button
            type="button"
            disabled={this.prevButtonControler()}
            onClick={() => this.previousPage()}
          >
              Previous Page
          </button>
          <button
            type="button"
            disabled={this.nextButtonController()}
            onClick={() => this.nextPage()}
          >
            Next Page
          </button>
        </div>
        <br />
        <br />
        <span>{`Page ${(offset / limit) + 1}`}</span>
      </div>
    );
  }
}

export default Locations;
