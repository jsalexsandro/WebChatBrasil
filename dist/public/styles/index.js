const container    = document.getElementById("container");
const containerLogin    = document.getElementById("container-login");
const inputArea    = document.getElementById("input-menu-local");
const contextMenu  = document.getElementById("context-menu")
const input        = document.getElementById("input-menu")
const button       = document.getElementById("button-menu")
const buttonNavBar = document.getElementById("button-navbar")
const text_navbar  = document.getElementById("text-navbar") // NAV BAR MENU
const view         = document.getElementById("view-messages") // VIEW MESSAGES
const footer       = document.querySelector("footer") // FOOTER

let control = false;

const context = {
    set:function(){
        // contextMenu.style.display = "block"
        contextMenu.style.width  = "200px"
        contextMenu.style.height = "250px"
        contextMenu.style.opacity = "1"
        control = true
    },
    remove:function(){
        // contextMenu.style.display = "none"
        contextMenu.style.width  = "0px"
        contextMenu.style.height = "0px"
        contextMenu.style.opacity = "0"
        control = false
    }
}



input.addEventListener("focus",function(){
    inputArea.style.border = "1px solid #044f59"
    context.remove()
})
input.addEventListener("focusout",function(){   
    inputArea.style.border = "0px solid #044f59"
    context.remove()

})

text_navbar.onclick = context.remove;
view.onclick        = context.remove;
footer.onclick      = context.remove;


buttonNavBar.onclick = function(){
    context.set()
}