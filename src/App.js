import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SearchFormSection from "./Components/SearchFormSection";

import ScrollUpButton from "react-scroll-up-button";

function App() {
    return (
        <div className="main-container">
            <Header />
            <SearchFormSection />
            <Footer />
            <ScrollUpButton
                style={{
                    backgroundColor: "#000",
                    border: "1px solid #fff",
                    borderRadius: "50%",
                    padding: "5px",
                    bottom: "50px",
                    outline: "none",
                }}
                ContainerClassName="btn-scroll-up"
                StopPosition={0}
                ShowAtPosition={800}
                tabIndex="0"
            />
        </div>
    );
}
export default App;
