import React, { Component, useRef, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    const apiKey = 'c8446168';

    axios
      .get("https://www.omdbapi.com?s=" + this.element.value + "&apikey=" + apiKey)
      .then(res => {
        const SearchedValues = res.data.Search;

        if (SearchedValues) {
          this.setState({ search: SearchedValues });
        } else {
        }
      })
      .catch(error => {
        console.log('error');
      });

    //this.setState({ value: this.element.value });

  }

  render() {

    const searchResults = this.state.search;
    console.log(searchResults);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" ref={el => this.element = el} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div>
          {searchResults.map((movie, i) => (
            <div key={i}>
              <img src={searchResults[i].Poster} />
              <h2>{searchResults[i].Title}</h2>
              <Link
                href="/movies/[id]"
                as={`/movies/${searchResults[i].imdbID}`}
              >
                <button>ver detalhe</button>
              </Link>
            </div>
          ))}
        </div>


      </div>
    );
  }
}

export default Homepage;
