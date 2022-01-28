let connectionCount = 0


type ObjMessage =  {
    author:string,
    message:string,
    date:string,
    key:string
}

var Messages = Array<ObjMessage>(
    {
        author:"Developer",
        message:"Bem Vindo!",
        date:"",
        key:"dev"
    }
)

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
            socket.emit("previus_message",Messages)
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

        socket.on("new_message",(object:ObjMessage) => {
            Messages.push(object)
            io.emit("set_message",object)
            console.log("Msg enviada")
        })

    })  
}