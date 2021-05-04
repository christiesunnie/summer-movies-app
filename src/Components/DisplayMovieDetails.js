import { useEffect, useState } from "react";
import firebase from "../firebase";

const DisplayMovieDetails = (props) => {
    // State to update the movie deatil
    const [movie, setMovie] = useState([]);

    // Rendering the API call to fetch the data for each movie
    useEffect(() => {
        const apiKey = "a95c3731bb8d542ff3503355315d717a";
        // passing prop of movidId from DisplayAllMovies component
        const searchUrl = `https://api.themoviedb.org/3/movie/${props.movieId}`;
        const url = new URL(searchUrl);
        url.search = new URLSearchParams({
            api_key: apiKey,
        });

        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((jsonResponse) => {
                // Update movie state from the data of API call
                setMovie(jsonResponse);
            });
    }, [props.movieId]);

    // Function to push the movie is added to the list to Firebase for storing data when the click event is triggered
    const selectMovie = (title) => {
        props.handleSelect();
        const dbRef = firebase.database().ref();
        dbRef.push(title);
    };

    return (
        // Display the detail of movie is selected
        <div className="movie-detail-outer">
            <div className="wrapper movie-detail-inner">
                <div className="movie-description">
                    <h2>{movie.original_title}</h2>
                    <p>{movie.overview}</p>
                    <button
                        onClick={() => selectMovie(movie)}
                        className="btn-add"
                    >
                        Add to your list
                    </button>
                </div>
                <div className="movie-poster">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={`Poster for ${movie.original_title}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default DisplayMovieDetails;
