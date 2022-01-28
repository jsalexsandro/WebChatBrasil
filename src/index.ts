import express from "express";
import path from "path";
import http from "http";
import ejs from "ejs";
import routes from "./routes";
import { BackEnd } from "./backend";

const app       = express()
const sever = http.createServer(app)
const io        = require("socket.io")(sever)

// set configs //
app.use(express.static(path.join(__dirname,"public")))
app.set("views",path.join(__dirname,"public"))
app.engine("html",ejs.renderFile)
app.set("view engine","html")
app.use(routes)

BackEnd(io)

sever.listen(3000,() => {
    console.log("The Sever listen: http://localhost:3000")
})