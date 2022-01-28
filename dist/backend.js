"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackEnd = void 0;
let connectionCount = 0;
function BackEnd(io) {
    io.on("connection", (socket) => {
        var username = "";
        socket.on("user-connected", (value) => {
            console.log(`Socket Connected: ${socket.id}`);
            username = value;
            connectionCount += 1;
            io.emit("crement", `${connectionCount}`);
        });
        socket.on("disconnect", (a) => {
            console.log("Socket Desconected: " + socket.id);
            if (connectionCount > 0) {
                connectionCount -= 1;
            }
            io.emit("crement", `${connectionCount}`);
        });
    });
}
exports.BackEnd = BackEnd;
