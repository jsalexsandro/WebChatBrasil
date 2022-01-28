const isExisit    = localStorage.getItem("connected?")
const userName    = localStorage.getItem("name?")
const buttonLogin = document.getElementById("button-login")

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


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
        localStorage.setItem("key?",getRandomInt(100000000,99999999999999999))

        location.reload()
    }
    // console.log(textName)
}   