var messageBox = document.getElementById("messageBox")
var messages = document.getElementById("messages")
var previewBox = document.getElementById("previewBox")

function createMessageNode(text){
    let newElement = document.createElement("div")
    newElement.innerHTML = `
    <div class="message">
        <div class="pfp">
        <img src="/static/img/guy.jpeg" alt="placeholder" class="pfp-img">
        </div>
        <div class="content">
            <div class="username">Mike</div>
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