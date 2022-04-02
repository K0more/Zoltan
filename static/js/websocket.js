var ws = new WebSocket("ws://localhost:8000/chat")

ws.onmessage = function(event){
    let sanitized = sanitizeHTML(event.data)
    let rendered = renderTex(sanitized)
    messages.appendChild(createMessageNode(rendered))
    messages.scrollTop = messages.scrollHeight
}

function sendMessage(message){
    ws.send(message)
}