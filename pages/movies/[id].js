import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'


function MovieDetail() {

    const { API_KEY } = process.env;

    const fetcher = url => fetch(url).then(r => r.json())

    const router = useRouter();

    const { query } = router;

    const { data, error } = useSWR(`https://www.omdbapi.com?i=${query.id}&apikey=${API_KEY}`, fetcher)
    console.log(data);
    if (error) return (
        <div>failed to load</div>
    )

    if (!data) return (
        <div>loading...</div>
    )

    return (
        <div>
            <img src={data.Poster}></img>
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
