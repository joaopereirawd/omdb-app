import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function Fetchdata() {
    const router = useRouter();
    const { query } = router;
    const { data, error } = useSWR(`https://www.omdbapi.com?i=${query.id}&apikey=c8446168`, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
        <div>
            <img src={data.Poster}></img>
        </div>
    )
}

function App() {
    return (
        <div>
            <Fetchdata />
        </div>
    )
}

export default App;
