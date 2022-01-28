"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
const index = "index.html";
routes.get("/", (req, res) => {
    res.render(index);
});
routes.get("/index.html", (req, res) => {
    res.render(index);
});
exports.default = routes;
