import React, { useState } from "react";
import axios from 'axios';
import Link from 'next/link';

export default function Homepage() {
    const { API_KEY } = process.env;

    const [movieTitle, setMovieTitle] = useState('');

    const [movieStore, setMovieStore] = useState([{ emptyState: true, emptyText: 'Faça uma pesquisa ex: spider man' }]);

    /**
     * Handle change.
     */

    const handleChange = event => {
        setMovieTitle(event.target.value);
    };

    /**
     * Handle submit.
     */

    function handleSubmit(event) {
        event.preventDefault();

        axios
            .get(`https://www.omdbapi.com?s=${movieTitle}&apikey=${API_KEY}`)

            .then(res => {
                const { data } = res;

                if (data.Response != 'False') {
                    setMovieStore(res.data.Search);
                } else {
                    setMovieStore([{ emptyState: true, emptyText: 'A sua pesquisa não corresponde a nenhum resultado.' }]);
                }
            })

            .catch(error => {
                setMovieStore([{ emptyState: true, emptyText: 'Ocorreu um erro, por favor tente mais tarde.' }]);
            });
    }

    /**
     * Empty state control.
     */

    function EmptyStateControl() {
        const emptyState = movieStore[0].emptyState;

        if (emptyState) {
            return (
                <p>{movieStore[0].emptyText}</p>
            )
        }
    }

    return (
        <div className={'movielist'}>
            <div className={'movielist__form'}>
                <div className={'movielist__form-item'}>
                    <form onSubmit={handleSubmit}>
                        <div className={'movielist__form-input'}>
                            <input
                                type={'text'}
                                value={movieTitle}
                                placeholder={'Search'}
                                onChange={handleChange}
                            />
                            <button type={'submit'}></button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={'movielist__wrapper row'}>
                {
                    Array.isArray(movieStore) && movieStore.length && movieStore[0].emptyState != true ?
                        movieStore.map((movie, i) => (
                            <div className={'movielist__wrapper-item col-lg-3'} key={i}>
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
                        <div className={'movielist__wrapper-msg'}>
                            <EmptyStateControl />
                        </div>
                }
            </div>
        </div>
    );
}
