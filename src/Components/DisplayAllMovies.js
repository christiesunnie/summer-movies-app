import { useState } from "react";

import { Link } from "react-scroll";
import DisplayMovieDetails from "./DisplayMovieDetails";

const DisplayAllMovies = (props) => {
    const [movieSelected, setMovieSelected] = useState(false);
    const [movieId, setMovieId] = useState("");

    return (
        <>
            <div className="search-container">
                {props.movies.length === 0 ? (
                    <h2 className="search-message">
                        Please select a specific year to see the list of summer
                        movies!
                    </h2>
                ) : (
                    <div className="searched-movies-list">
                        {props.movies.map((individualMovie) => {
                            return (
                                <div
                                    key={individualMovie.id}
                                    className="movie-container"
                                >
                                    <div>
                                        <Link
                                            to="movie-detail"
                                            spy={true}
                                            smooth={true}
                                        >
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${individualMovie.poster_path}`}
                                                alt={
                                                    individualMovie.original_title
                                                }
                                                onClick={() => {
                                                    setMovieSelected(true);
                                                    setMovieId(
                                                        individualMovie.id
                                                    );
                                                }}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div id="movie-detail">
                {movieSelected ? (
                    <DisplayMovieDetails
                        movieId={movieId}
                        handleSelect={props.handleSelect}
                    />
                ) : null}
            </div>
        </>
    );
};

export default DisplayAllMovies;
