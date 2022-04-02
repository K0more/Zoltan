var messageBox = document.getElementById("messageBox")
var messages = document.getElementById("messages")
var previewBox = document.getElementById("previewBox")

function createMessageNode(text){
    let newElement = document.createElement("div")
    newElement.innerHTML = `
    <div class="message">
        <div class="pfp">
        <img src="/static/img/outline_person_outline_black_24dp.png" alt="placeholder">
        </div>
        <div class="content">
            <div class="username">WasabiTaco69</div>
            ${text}
            </div>
    </div>
    `
    // newElement.innerHTML = "<span>" + text + "</span>"
    return newElement
}

function sanitizeHTML(text){
    let newElement = document.createElement("div")
    newElement.innerText = text
    return newElement.innerHTML
}