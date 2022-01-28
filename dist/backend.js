"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackEnd = void 0;
let connectionCount = 0;
var Messages = Array({
    author: "Developer",
    message: "Bem Vindo!",
    date: "",
    key: "dev"
});
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
            socket.emit("previus_message", Messages);
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
            Messages.push(object);
            io.emit("set_message", object);
            console.log("Msg enviada");
        });
    });
}
exports.BackEnd = BackEnd;
