const Delete = function(id){
    sio.emit("removeMsg",id)
}

sio.on("frontEndDeleteMessage",(id) => {
    const messagesView = document.getElementById("view-messages")
    const messageDelete = document.getElementById(id)   
    messagesView.removeChild(messageDelete)
})