import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { initialize } = useMockData();
    const handleClick = () => {
        console.log("clicked");
        initialize();
    };
    return (
        <div className="container mt-5">
            <h1> Main Page</h1>
            <h3>initializing data in Firebase</h3>
            <button className="btn btn-primary" onClick={handleClick}>
                initialize
            </button>
        </div>
    );
};

export default Main;
