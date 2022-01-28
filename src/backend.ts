let connectionCount = 0

export function BackEnd(io?:any){
    io.on("connection",(socket:any) => {
        
        var username = ""
        socket.on("user-connected",(value:string) => {
            console.log(`Socket Connected: ${socket.id}`)
            username = value
            connectionCount += 1;
            io.emit("crement",`${connectionCount}`)
        })

        socket.on("disconnect",(a?:any) => {
            console.log("Socket Desconected: "+socket.id)
            if (connectionCount > 0){
                connectionCount -= 1;
            }
            io.emit("crement",`${connectionCount}`)
        })
    })  
}