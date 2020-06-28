import React, { Component, useRef, useEffect, useState } from "react";
import axios from 'axios';
import Link from 'next/link';

export default function Homepage() {
  const { API_KEY } = process.env;

  const [movieTitle, setMovieTitle] = useState('');

  const [movieStore, setMovieStore] = useState([]);

  const handleChange = event => {
    setMovieTitle(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(`https://www.omdbapi.com?s=${movieTitle}&apikey=${API_KEY}`)
      .then(res => {
        const { data } = res;
        if (data.Response != 'False') {
          setMovieStore(res.data.Search);
          console.log(res.data.Search);
        } else {
          setMovieStore([]);
        }

      })
      .catch(error => {
        console.log('error');
      });
  }

  return (
    <div className={'movielist'}>
      <div className={'movielist__form'}>
        <form onSubmit={handleSubmit}>
          <div className={'movielist__form-item'}>
            <div className={'movielist__form-input'}>
              <input type="text" value={movieTitle} placeholder="Type Spider Man" onChange={handleChange} />
              <button type="submit"></button>
            </div>
          </div>
        </form>
      </div>
      <div className={'movielist__wrapper'}>
        {
          movieStore.length ?
            movieStore.map((movie, i) => (
              <div className={'movielist__wrapper-item'} key={i}>
                <div className={'movielist__wrapper-item-content'}>
                  <div className={'movielist__wrapper-item-poster'}>
                    <img src={movieStore[i].Poster} />

                    <div className={'movielist__wrapper-item-mask'}>
                      <Link
                        href="/movies/[id]"
                        as={`/movies/${movieStore[i].imdbID}`}
                      >
                        <div className={'movielist__wrapper-item-mask-link'}>
                          <button>View details</button>
                        </div>
                      </Link>

                      <div className={'movielist__wrapper-item-mask-label'}>
                        <small>
                          {movieStore[i].Year}
                        </small>

                        <h2>
                          {movieStore[i].Title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            :
            <div>
              Ainda nao procurou pr nenhum filme
            </div>
        }
      </div>
    </div>
  );
}
