import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies({search, sort}) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previusSearch = useRef(search)

    const getMovies = useCallback(
        async ({search}) => {
            if (search === previusSearch.current) return 

            try {
                setLoading(true)
                setError(null)
                const newMovies = await searchMovies({ search })
                setMovies(newMovies)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
    , [])

    const sortedMovies = useMemo(() => {
        return sort ? [...movies].sort((a,b) => a.year - b.year) : movies
    }, [sort, movies])
 
    return { movies: sortedMovies, getMovies, loading }
}

