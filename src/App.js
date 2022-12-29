import {useEffect, useState} from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';

const API_KEY = ""

const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`

const movie1 = {
    "Title": "Assassin's Creed II",
    "Year": "2009",
    "imdbID": "tt1201133",
    "Type": "game",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzczOTI3OTgxMl5BMl5BanBnXkFtZTgwNTcwOTU1MDE@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Creed')
    }, []);

    return (
        <div className={"app"}>
            <h1>MovieLand</h1>

            <div className={"search"}>
                <input
                    placeholder={"Search for movies"}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt={"search"}
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className={"container"}>
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div>
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    )
}

export default App;
