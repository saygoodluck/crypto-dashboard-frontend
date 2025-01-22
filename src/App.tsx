import React from "react";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import "./App.css";

const App = () => {
    return (
        <div className="app">
            <Toolbar/>
            <Dashboard/>
        </div>
    );
};

export default App;
