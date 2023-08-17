import { useCallback, useState } from 'react'
import Movies from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
    const [sort, setSort] = useState(false)
    const { search, setSearch, error } = useSearch()
    const { movies, getMovies, loading } = useMovies({ search, sort })

    const debounceMovies = useCallback(
        debounce((search) => getMovies({search}), 500)
    , [getMovies])

    const handdleSearch = (e) => {
        const newSearch = e.target.value
        setSearch(newSearch)
        debounceMovies(newSearch)
    }

    const handdleSubmit = async (e) => {
        e.preventDefault()
        getMovies({search})
    }

    const handdleSort = () => {
        setSort(!sort)
    }

    return (
        <div className='page'>
            <header>
                <h1>Movie Search</h1>
                <form className="buscador" onSubmit={handdleSubmit}>
                    <input type="text" className='search' onChange={handdleSearch} value={search}/>
                    <input type="checkbox" onChange={handdleSort} name="sort" checked={sort} />
                    <button type='submit'>Search</button>
                </form>
                {error && <p style={{color:'red'}}>{error}</p>}
                {loading && <p style={{color: 'blue'}}>Loading...</p>}
            </header>
            <main>
                <Movies movies={movies}/>
            </main>
        </div>
    )
}

export default App