// Node Core Modules 
const path = require("path");

// Package Modules
const express = require('express');
const helmet = require("helmet");
const cors = require("cors");

// Export Module
module.exports = (app) => {
    // enable CORS
    app.use(cors());

    // Secure the app by setting various HTTP headers off.
    // app.use(helmet());

    // Tell express to recognize the incoming Request Object as a JSON Object
    app.use(express.json());

    // Create express static engine to run React app build
    app.use(express.static(path.join(__dirname, "..", "..", "..", "client", "build")));

    return app
}