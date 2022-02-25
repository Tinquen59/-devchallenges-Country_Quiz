import React from "react";
import ReactDOM from "react-dom";

import "./assets/styles/styles.css";

import Footer from "./components/Footer/Footer";
import Quiz from "./pages/Quiz/Quiz";

ReactDOM.render(
    <React.StrictMode>
        <Quiz />

        <Footer />
    </React.StrictMode>,
    document.getElementById("root")
);
