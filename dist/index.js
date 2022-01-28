"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const ejs_1 = __importDefault(require("ejs"));
const routes_1 = __importDefault(require("./routes"));
const backend_1 = require("./backend");
const app = (0, express_1.default)();
const sever = http_1.default.createServer(app);
const io = require("socket.io")(sever);
// set configs //
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.set("views", path_1.default.join(__dirname, "public"));
app.engine("html", ejs_1.default.renderFile);
app.set("view engine", "html");
app.use(routes_1.default);
(0, backend_1.BackEnd)(io);
sever.listen(3000, () => {
    console.log("The Sever listen: http://localhost:3000");
});
