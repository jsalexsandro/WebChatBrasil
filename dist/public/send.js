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

    function normalDate(calback){
        var _day = ""
        if (calback > 9){
            _day = calback
        } else {
            _day = "0"+calback
        }
        return _day
    }


    var hours = `${normalDate(date.getDate())}/${normalDate(date.getMonth()+1)}/${date.getFullYear()} ${date.getHours()}:${normalDate(date.getMinutes())}`

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


function RenderMessage(message,author,date,keyReceved,id){
    var key = localStorage.getItem("key?")
    var code = ""
    if (key == keyReceved){
        code += `
<section id="${id}" class="message m1">
    <div class="message-info m2">
        <p id="author">
            ${author}
        </p>
        <section id="info"> 
            <p id="date">
                ${date}
            </p>
            <button onclick="Delete('${id}')" id="delete">
                <i class="far fa-trash-alt delete-icon"></i>
            </button>
        </section>
            
    </div>
    <article class="value m3">
        <div id="message-value">   
            <span id="value">
                ${message}
            </span>
        </div>
    </article>
</section>
        `
    } else {
    code += `
<section id="${id}" class="message">
    <div class="message-info">
        <p id="author">
            ${author}
        </p>
        <section id="info"> 
            <p id="date">
                ${date}
            </p>
        </section>
            
    </div>
    <article class="value">
        <div id="message-value">   
            <span id="value">
                ${message}
            </span>
        </div>
    </article>
</section>
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
            list[object].key,
            list[object].id,

        )
    }
    document.querySelector("#view-messages").scroll(0,100000000)
})

sio.on("set_message",(object) => {
    RenderMessage(
        object.message,
        object.author,
        object.date,
        object.key,
        object.id
    )
    document.querySelector("#view-messages").scroll(0,100000000)
})
