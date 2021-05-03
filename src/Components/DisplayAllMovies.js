import { useState } from "react";

import { Link } from "react-scroll";
import DisplayMovieDetails from "./DisplayMovieDetails";

const DisplayAllMovies = (props) => {
    // State to update the selected movie and movie id
    const [movieSelected, setMovieSelected] = useState(false);
    const [movieId, setMovieId] = useState("");

    return (
        <>
            <div className="search-container">
                {/* If there is no movies displaying on the page, show the message to ask the user select a year from the dropdown menu */}
                {props.movies.length === 0 ? (
                    <h2 className="search-message">
                        Please select a specific year to see the list of summer
                        movies!
                    </h2>
                ) : (
                    // Display all of the movies from the selected year and hide the message
                    <div className="searched-movies-list">
                        {/* Loop through the array of movies to display all of the movies' poster on the page  */}
                        {props.movies.map((individualMovie) => {
                            return (
                                <div
                                    key={individualMovie.id}
                                    className="movie-container"
                                >
                                    <div>
                                        {/* Scroll to the movie detail when the user click the movie poster */}
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
                {/* Display the movie detail when the movie poster is clicked */}
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
