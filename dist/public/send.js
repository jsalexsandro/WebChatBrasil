button.onclick = function(){
    const _input = document.getElementById("input-menu")
    
    const date = new Date()

    var isConncted = localStorage.getItem("connected?")
    var author = localStorage.getItem("name?")
    var key = localStorage.getItem("key?")

    function reload(){
        localStorage.clear()
        location.reload()
    }

    if (isConncted != "yes"){
        reload()
    }

    if (author == undefined || author == "" || author == null){
        reload()
    }

    if (key == undefined || key == "" || key == null){
        reload()
    }

    var hours = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

    var object = {
        author:author,  
        message:"",
        date:hours,
        key:key,
        id:String(getRandomInt(9999999999,9999999999999999999))
    }    

    const text = String(_input.value).trim()
    if (text != ""){
        object.message = text
        sio.emit("new_message",object)
        _input.value = ""
    }
}


function RenderMessage(message,author,date,keyReceved){
    var key = localStorage.getItem("key?")
    var code = ""
    if (key == keyReceved){
        code = `
<div class="message m1">
    <div class="local m2">
        <div class="user ">
            ${author}(Você)
        </div>
        <div class="date">
            ${date}
        </div>
    </div>
    <p class="content m3">
        <span>
            ${message}
        </span>
    </p>
</div>
`
    } else {
        code = `
<div class="message">
    <div class="local">
        <div class="user ">
            ${author}
        </div>
        <div class="date">
            ${date}
        </div>
    </div>
    <p class="content">
        <span>
            ${message}
        </span>
    </p>
</div>
        `
    }

    document.querySelector("#view-messages").innerHTML += code
}

sio.on("previus_message",(list) => {
    for (var object in list){
        RenderMessage(
            list[object].message,
            list[object].author,
            list[object].date,
            list[object].key
        )
    }
    document.querySelector("#view-messages").scroll(0,100000000)
})

sio.on("set_message",(object) => {
    RenderMessage(
        object.message,
        object.author,
        object.date,
        object.key
    )
    document.querySelector("#view-messages").scroll(0,100000000)
})
