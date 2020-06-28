import React, { Component, useRef, useEffect, useState } from "react";
import axios from 'axios';
import Link from 'next/link';

export default function Homepage() {

  const [movieTitle, setMovieTitle] = useState('');
  const [movieStore, setMovieStore] = useState([]);

  const handleChange = event => {
    setMovieTitle(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(`https://www.omdbapi.com?s=${movieTitle}&apikey=c8446168`)
      .then(res => {
        const { data } = res;
        if (data.Response != 'False') {
          setMovieStore(res.data.Search);

        } else {
          setMovieStore([]);
        }

      })
      .catch(error => {
        console.log('error');
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={movieTitle} onChange={handleChange} />
        </label>
        <input type="submit" value="search" />
      </form>

      {movieStore.length ?
        movieStore.map((movie, i) => (
          <div key={i}>
            <img src={movieStore[i].Poster} />
            <h2>{movieStore[i].Title}</h2>
            <Link
              href="/movies/[id]"
              as={`/movies/${movieStore[i].imdbID}`}
            >
              <button>ver detalhe</button>
            </Link>
          </div>
        ))
        :
        <div>
          Ainda nao procurou pr nenhum filme
        </div>
      }

    </div>
  );
}
