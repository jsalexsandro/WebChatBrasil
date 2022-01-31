const exit = document.getElementById("exit")
exit.onclick = function(){
    localStorage.clear()
    location.reload()
}