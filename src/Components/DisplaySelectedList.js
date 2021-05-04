import DisplayPredictedLists from "./DisplayPredictedLists";
import { useEffect, useState } from "react";
import firebase from "../firebase.js";
import Swal from "sweetalert2";

const DisplaySelectedList = ({ list, handleRemove, handleSave }) => {
    const [predictedLists, setPredictedLists] = useState([]);

    useEffect(() => {
        // Reference the prediction object from Firebase
        const dbRef = firebase.database().ref("prediction");
        dbRef.on("value", (res) => {
            const data = res.val();
            const newState = [];
            for (let key in data) {
                newState.push({
                    key: key,
                    list: data[key],
                });
            }
            // Updating the list of final predicted movies
            setPredictedLists(newState);
        });
    }, []);

    const handleDelete = (key) => {
        // Showing the pop box to confirm if the user wants to delete the list
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                // When the user deleted the list, delete the list from Firebase data server
                const dbRef = firebase.database().ref("prediction");
                dbRef.child(key).remove();
            }
        });
    };

    return (
        <div className="wrapper">
            {/* Check if the selected list is created or not to display or hide the container on the page */}
            {list.length !== 0 ? (
                <div className="prediction-container">
                    <h2>Prediction List of Summer Movie</h2>
                    <ol className="prediction-list">
                        {/* Looping through the list of selected movies array state to display on the page*/}
                        {list.map((mov, index) => {
                            return (
                                <li key={mov.key}>
                                    {index + 1}. {mov.movie.title}
                                    <button
                                        onClick={() => handleRemove(mov.key)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                    {/* Check if the selected list has more than 10 movies, display a warning message to ask the user remove extra movies */}
                    {list.length > 10 ? (
                        <h3>
                            You have chosen more than 10 movies! Please remove
                            your selected movies to save the list!
                        </h3>
                    ) : (
                        // Check if the selected list has less than 10 movies, display the button "Save the list"
                        <button
                            onClick={() => {
                                handleSave();
                            }}
                        >
                            Save the list!
                        </button>
                    )}
                </div>
            ) : null}
            {/* Passing the value for the props of DisplayPredictedLists component */}
            <DisplayPredictedLists
                predictedLists={predictedLists}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default DisplaySelectedList;
