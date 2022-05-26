"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors({
    origin: ["http://localhost:5000"],
}));
app.use(express.json());
var port = 4500;
app.listen(port, function () {
    console.log("Extractor server listen on port ".concat(port));
});
