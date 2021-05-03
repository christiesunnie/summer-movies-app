import { useState, useEffect } from "react";
import DisplayYears from "./DisplayYears";
import FirebaseListsData from "./FirebaseListsData";

function SearchFormSection() {
    //this use state gets the year that is being populated in the dorpdown menu
    const [year, setYear] = useState([]);
    //user selceted year. this info is also passed to the api call
    const [userYear, setUserYear] = useState("placeHolder");
    const [yearSelected, setYearSelected] = useState(false);

    const handleUserChoice = (e) => {
        //getting the usenpmr value
        setUserYear(e.target.value);
    };

    const handleSelect = () => {
        setYearSelected(!yearSelected);
    };

    useEffect(() => {
        //CREDIT THIS SOURCE https://renatello.com/javascript-array-of-years/
        const max = new Date().getFullYear();
        //change the number to display more or less years
        const min = max - "50";
        const years = [];

        for (let i = max; i >= min; i--) {
            years.push(i.toString());
            setYear(years);
        }
    }, []);

    return (
        <section className="search-container">
            <h2 className="app-description">
                Summer Movies is an app that lets users compete with friends in
                summer movie pools by predicting the list of top 10 grossing
                movies for a particular year!
            </h2>
            <div>
                <form className={yearSelected ? "hidden" : "wrapper"}>
                    <label htmlFor="yearDropDown">Pick the Year:</label>
                    <select
                        name="yearDropDown"
                        id="yearDropdown"
                        value={userYear}
                        onChange={handleUserChoice}
                        className="btn-select"
                    >
                        <option value="placeHolder" disabled>
                            Year
                        </option>
                        {year.map((year) => {
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </form>
            </div>
            <DisplayYears year={userYear} handleSelect={handleSelect} />
            <FirebaseListsData handleSelect={handleSelect} />
        </section>
    );
}

export default SearchFormSection;
