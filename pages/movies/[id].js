import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function Profile() {
    const router = useRouter();
    const { query } = router;
    const { data } = useSWR(`https://www.omdbapi.com?i=${query.id}&apikey=c8446168`, fetcher, {
        suspense: true
    })

    return (
        <div>
            <img src={data.Poster}></img>
        </div>
    )
}

function App() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Profile />
        </Suspense>
    )
}

export default App;
