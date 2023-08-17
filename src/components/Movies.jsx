function ListMovies ({ movies }) {
    return (
        <ul className="movies">
            {movies.map(movie => (
                <li className="movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.poster} />
                </li>
            ))}
        </ul>
    )
}

function NoResults() {
    return (
        <p>No results found.</p>
    )
}

export default function Movies ({ movies }) {
    const hasMovies = movies?.length > 0 ? movies : null
    return (
        hasMovies ? <ListMovies movies={movies} /> : <NoResults />
    )
}