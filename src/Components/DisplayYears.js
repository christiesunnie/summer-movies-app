import { useState, useEffect } from "react";
import DisplayAllMovies from "./DisplayAllMovies";

const DisplayYears = (props) => {
    const [movieObj, setMovieObj] = useState([]);
    const [numOfPages, setNumOfPages] = useState([]);

    const apiKey = "a95c3731bb8d542ff3503355315d717a";
    const searchUrl = "https://api.themoviedb.org/3/discover/movie";
    const lessDate = "release_date.lte";
    const greatDate = "release_date.gte";

    const lessYear = `${props.year}-09-04`;
    const greatYear = `${props.year}-05-01`;
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
                setMovieObj(jsonResponse.results);
                for (let i = 1; i < 21; i++) {
                    numArray.push(i);
                }
                setNumOfPages(numArray);
            });
    }, [lessYear, greatYear]);

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
