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

  next() {
    this.setState({ table: [] }, () => {
      this.setState((state) => ({ offset: state.offset + 20 }),
        () => this.fetchPokeLocations());
    });
  }

  back() {
    this.setState({ table: [] }, () => {
      this.setState((state) => ({ offset: state.offset - 20 }),
        () => this.fetchPokeLocations());
    });
  }

  pBtn() {
    const { offset } = this.state;
    if (offset === 0) {
      return true;
    }
    return false;
  }

  nBtn() {
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
          <button type="button" disabled={this.pBtn()} onClick={() => this.back()}>
              Previous Page
          </button>
          <button type="button" disabled={this.nBtn()} onClick={() => this.next()}>
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
