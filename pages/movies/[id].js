import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'


function MovieDetail() {

    const { API_KEY } = process.env;

    const fetcher = url => fetch(url).then(r => r.json())

    const router = useRouter();

    const { query } = router;

    const { data, error } = useSWR(`https://www.omdbapi.com?i=${query.id}&apikey=${API_KEY}`, fetcher)

    if (error) return (
        <div>failed to load</div>
    )

    if (!data) return (
        <div>loading...</div>
    )

    return (
        <div className={'movie-detail'}>
            <div className={'movie-detail__wrapper'}>
                <div className={'movie-detail__cover'}>
                    <div className={'imdb-rank'}>
                        <div className={'imdb-rank__circle'}>
                            {data.imdbRating}
                        </div>
                    </div>

                    <div className={'movie-detail__controls'}>
                        <div className={'movie-detail__controls-wrapper'}>
                            <div className={'movie-detail__poster'}>
                                <img src={data.Poster} />
                            </div>

                            <div className={'movie-detail__description'}>
                                <h1>
                                    {data.Title}
                                </h1>

                                <p>
                                    {data.Plot}
                                </p>

                                <p>
                                    {data.Genre}
                                </p>

                                <a href={`https://www.imdb.com/title/${data.imdbID}`} target="_blank">Veiw on IMDB</a>
                            </div>

                            <div className={'movie-detail__info-list'}>
                                <ul>
                                    <li>
                                        <span>Director:</span>

                                        <br></br>

                                        {data.Director}
                                    </li>

                                    <li>
                                        <span>Awards:</span>

                                        <br></br>

                                        {data.Awards}
                                    </li>

                                    <li>
                                        <span>Actors:</span>

                                        <br></br>

                                        {data.Actors}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={'movie-detail__cover-img'}>
                        <img src={data.Poster} />
                    </div>

                    <div className={'movie-detail__cover-bg'}></div>
                </div>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <div>
            <MovieDetail />
        </div>
    )
}
