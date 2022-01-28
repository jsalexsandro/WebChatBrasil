const online = document.getElementById("online")

sio.on("crement",(value) => {
    online.innerHTML = '<p id="online-text-1">Pessoas Online:</p> '+'<p id="online-text-2">'+value+"</p>"
})  