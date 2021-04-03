import React from "react";
import { Link } from "react-router-dom";

const ReasultPage = () => {
    return <div className="result-page">
        <div className="page-inner">
            <h3>Trivia completed!</h3>
            <Link to="/">Return to the main page</Link>
        </div>
    </div>
}

export default ReasultPage;