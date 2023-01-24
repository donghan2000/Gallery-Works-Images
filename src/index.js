import './styles.css'
import './fonts/Montserrat/Montserrat-Medium.ttf';
import React from "react";
import { createRoot } from 'react-dom/client'
import App from "./Components/App";

if (typeof browser === "undefined") {
    var browser = chrome;
}

createRoot(document.getElementById('root')).render(<App />)

