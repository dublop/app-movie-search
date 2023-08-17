import { useEffect, useState, useRef } from "react";

export function useSearch() {
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = search === ''
            return
        }
        if(search === '') {
            setError("You can't find an empty movie")
            return
        }
        if(search.length < 3) {
            setError("The movie length must be greater than 3 characters")
            return
        }
        if(search.match(/^\d+$/)) {
            setError("You can't search a movie with a number")
            return
        }

        setError(null)
    }, [search])

    return { search, setSearch, error }
}