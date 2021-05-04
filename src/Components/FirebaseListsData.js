import "../App.css";
import { useEffect, useState } from "react";
import firebase from "../firebase";

import DisplaySelectedList from "./DisplaySelectedList";

const FirebaseListsData = ({ handleSelect }) => {
    // Updating the list movies the user want to add to the prediction list
    const [list, setList] = useState([]);

    useEffect(() => {
        // Here we create a variable that holds a reference to our database
        const dbRef = firebase.database().ref();
        dbRef.on("value", (response) => {
            //  Create a new variable to store the new state that we want to introduce to out app
            const newState = [];
            // store the response from our database
            const data = response.val();
            for (let key in data) {
                newState.push({
                    key: key,
                    movie: data[key],
                });
            }
            // Create a copy of the array of objects from Firebase to filter the object with "prediction" key
            // Update the list of selected movies
            const copyNewState = [...newState];
            copyNewState.filter((obj) => {
                if (obj.key === "prediction") {
                    const filteredNewState = copyNewState.slice(
                        0,
                        copyNewState.length - 1
                    );
                    // Updating the list of selected movies
                    return setList(filteredNewState);
                } else {
                    return setList(copyNewState);
                }
            });
        });
    }, []);

    // Remove button function
    const handleRemove = (key) => {
        const dbRef = firebase.database().ref();
        dbRef.child(key).remove();
        if (list.length === 1) {
            setList([]);
        }
    };

    // "Save the list" button function
    const handleSave = () => {
        handleSelect();

        // Toggle the status of  "Save the list" button
        const dbRef = firebase.database().ref("prediction").push();
        dbRef.set(list);
        // Remove the selected list of movie from Firebase when click "Save the list" button
        const dbFirebase = firebase.database().ref();
        list.map((obj) => dbFirebase.child(obj.key).remove());
    };

    return (
        <section className="movie-lists-container">
            {/* Passing the values for props of DisplaySelectedList component */}
            <DisplaySelectedList
                list={list}
                handleRemove={handleRemove}
                handleSave={handleSave}
            />
        </section>
    );
};
export default FirebaseListsData;
