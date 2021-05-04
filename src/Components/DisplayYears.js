import { useState, useEffect } from "react";
import DisplayAllMovies from "./DisplayAllMovies";

const DisplayYears = (props) => {
    // Update the state of movies data from API call and number of pages contain the movies
    const [movieObj, setMovieObj] = useState([]);
    const [numOfPages, setNumOfPages] = useState([]);

    // Created the variables for API call
    const apiKey = "a95c3731bb8d542ff3503355315d717a";
    const searchUrl = "https://api.themoviedb.org/3/discover/movie";
    const lessDate = "release_date.lte";
    const greatDate = "release_date.gte";

    // Passing props of year from SearchFormSection component
    const lessYear = `${props.year}-09-04`;
    const greatYear = `${props.year}-05-01`;

    // Rendering the data after retreiving from API call
    useEffect(() => {
        const numArray = [];
        const url = new URL(searchUrl);
        url.search = new URLSearchParams({
            api_key: apiKey,
            [lessDate]: lessYear,
            [greatDate]: greatYear,
            include_adult: "false",
            include_video: "false",
        });

        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((jsonResponse) => {
                // Set the movie object state for the data from API
                setMovieObj(jsonResponse.results);
                // Limit only 21 pages of the movies and create an array number of pages
                for (let i = 1; i < 21; i++) {
                    numArray.push(i);
                }
                setNumOfPages(numArray);
            });
    }, [lessYear, greatYear]);

    // Listening the click event to create the second API call base on the number of the page
    const handleClick = (pageNum) => {
        const url = new URL(searchUrl);
        url.search = new URLSearchParams({
            api_key: apiKey,
            [lessDate]: lessYear,
            [greatDate]: greatYear,
            page: pageNum,
        });
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((jsonResponse) => {
                // Create the array of movie object for data from the API and set the movie object state
                const newArray = [];
                jsonResponse.results.filter((movies) => {
                    if (movies.poster_path !== null) {
                        newArray.push(movies);
                    }
                    return newArray;
                });
                setMovieObj(newArray);
            });
    };

    return (
        <div>
            <div className="wrapper">
                {/* Check if the user selects the year from the dropdown menu to display the list of pages section or hide the list of pages section*/}
                {movieObj.length !== 0 ? (
                    <div className="page-container">
                        {numOfPages.map((page) => {
                            return (
                                <button
                                    key={page}
                                    onClick={() => handleClick(page)}
                                    className="page-btn"
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>
                ) : null}

                {/* Passing the values for props from DisplayAllMovies component */}
                <DisplayAllMovies
                    movies={movieObj}
                    apiKey={apiKey}
                    handleSelect={props.handleSelect}
                />
            </div>
        </div>
    );
};
export default DisplayYears;
