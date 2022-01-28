const isExisit    = localStorage.getItem("connected?")
const userName    = localStorage.getItem("name?")
const buttonLogin = document.getElementById("button-login")

function SendUser(){
    sio.emit("user-connected",userName)
}

if (isExisit == "yes"){
    container.style.display = "block"
    containerLogin.style.display = "none"
    SendUser();
} else {
    localStorage.clear()
}

buttonLogin.onclick = function(){
    const textName = String(document.getElementById("input-login").value).trim()
    if (textName != ""){    
        localStorage.setItem("connected?","yes")
        localStorage.setItem("name?",textName)
        location.reload()
    }
    // console.log(textName)
}   