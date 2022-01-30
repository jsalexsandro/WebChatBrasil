"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackEnd = void 0;
const fs_1 = require("fs");
let connectionCount = 0;
const getMessages = function () {
    var _code_ = JSON.parse((0, fs_1.readFileSync)("./msg.json", "utf-8"));
    console.log(_code_);
    return _code_["msg"];
};
const writeMessages = function (message) {
    var affMsg = getMessages();
    affMsg.push(message);
    (0, fs_1.writeFileSync)("./msg.json", JSON.stringify({
        msg: affMsg
    }), "utf8");
};
function BackEnd(io) {
    io.on("connection", (socket) => {
        var isConnected = false;
        var username = "";
        socket.on("user-connected", (value) => {
            console.log(`Socket Connected: ${socket.id}`);
            username = value;
            connectionCount += 1;
            if (!isConnected) {
                isConnected = true;
            }
            io.emit("crement", `${connectionCount}`);
            socket.emit("previus_message", getMessages());
        });
        socket.on("disconnect", (a) => {
            if (isConnected) {
                console.log("Socket Desconected: " + socket.id);
                if (connectionCount > 0) {
                    connectionCount -= 1;
                }
                io.emit("crement", `${connectionCount}`);
                isConnected = false;
            }
        });
        socket.on("new_message", (object) => {
            writeMessages(object);
            io.emit("set_message", object);
            console.log("Msg enviada");
        });
    });
}
exports.BackEnd = BackEnd;
