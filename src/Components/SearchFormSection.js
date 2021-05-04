import { useState, useEffect } from "react";
import DisplayYears from "./DisplayYears";
import FirebaseListsData from "./FirebaseListsData";

function SearchFormSection() {
    //Updating state gets the year that is being populated in the dorpdown menu
    const [year, setYear] = useState([]);
    //user selceted year. this info is also passed to the api call
    const [userYear, setUserYear] = useState("placeHolder");
    const [yearSelected, setYearSelected] = useState(false);

    // Listening to the change event when the user select the year from dropdown menu to set the yearSelected state
    const handleUserChoice = (e) => {
        //getting the usenpmr value
        setUserYear(e.target.value);
    };

    // Toogle function to display or hide dropdown menu
    const handleSelect = () => {
        setYearSelected(!yearSelected);
    };

    useEffect(() => {
        //CREDIT THIS SOURCE https://renatello.com/javascript-array-of-years/
        const max = new Date().getFullYear();
        // Showing only 50 years back from the current year in the dropdown menu
        const min = max - "50";
        const years = [];
        // Create an array of years to set the year state
        for (let i = max; i >= min; i--) {
            years.push(i.toString());
            setYear(years);
        }
    }, []);

    return (
        // Display the form section for selecting the years
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
                        {/* Looping through the array of year state to disply the options for dropdown menu */}
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
            {/* Passing the values for props of DisplayYears component */}
            <DisplayYears year={userYear} handleSelect={handleSelect} />
            {/* Passing the values for props of FirebaseListsData component */}
            <FirebaseListsData handleSelect={handleSelect} />
        </section>
    );
}

export default SearchFormSection;
