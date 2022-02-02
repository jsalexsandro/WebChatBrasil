import {readFileSync,writeFileSync} from "fs"

type ObjMessage =  {
    author:string,
    message:string,
    date:string,
    key:string,
    id:string
}

let connectionCount = 0

const getMessages = function():Array<any>{
    var _code_ = JSON.parse(readFileSync("./msg.json","utf-8"))
    return _code_["msg"]
}   

const writeMessages = function(message:ObjMessage){
    var affMsg = getMessages()
    affMsg.push(message);
    writeFileSync("./msg.json",JSON.stringify({
        msg:affMsg
    },null,4),"utf8")
}



function removeMessage(id:any){
    var messages = getMessages()
    var newMessages = []
    for (var c in messages){
        if (messages[c].id != id){
            newMessages.push(messages[c])
        }
    }
    writeFileSync("./msg.json",JSON.stringify({
        msg:newMessages
    },null,4),"utf8")
}

export function BackEnd(io?:any){
    io.on("connection",(socket:any) => {
        var isConnected = false
        var username = ""
        socket.on("user-connected",(value:string) => {
            console.log(`Socket Connected: ${socket.id}`)
            username = value
            connectionCount += 1;
            if (!isConnected) {
                isConnected = true
            }
            io.emit("crement",`${connectionCount}`)
            socket.emit("previus_message",getMessages())
        })

        socket.on("disconnect",(a?:any) => {
            if (isConnected){
                console.log("Socket Desconected: "+socket.id)
                if (connectionCount > 0){
                    connectionCount -= 1;
                }
                io.emit("crement",`${connectionCount}`)
                isConnected = false
            }
        })

        socket.on("removeMsg",(id:any) => {
            removeMessage(id)
            io.emit("frontEndDeleteMessage",id)
        })

        socket.on("new_message",(object:ObjMessage) => {
            writeMessages(object)
            io.emit("set_message",object)
        })

    })  
}