var messageBox = document.getElementById("messageBox")
var messages = document.getElementById("messages")
var previewBox = document.getElementById("previewBox")
var messageBuffer = {}
let curUser = ""

function createMessageNode(text, id, source, author){
    console.log(`Author=${author}`)
    let newElement = document.createElement("div")
    newElement.innerHTML = `
    <div class="message" id="mid${id}">
        <div class="pfp">
        <img src="${author.pfp}" alt="placeholder" class="pfp-img">
        </div>
        <div class="content">
            <div class="username">${author.username}<span onclick=showSource(${id})> <img src="static/img/code.webp" height="15px" style="cursor: pointer" class="source-btn"> </span> </div>
            <div>${text}</div>
            <div id="sid${id}" class="source">
                <div id="copyBtn" onclick="copySourceToClipboard(${id})" onmouseout="resetSourceCopyBtn(${id})"> <img src="static/img/outline_content_copy_black_18dp.png" height="15px" class="source-copy-btn" id="scb${id}"></div>
                ${source}
            </div>
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

function MessageObj(content, author){
    this.content = content;
    this.author = author;
}