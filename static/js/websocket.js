var ws = new WebSocket("ws://localhost:8000/chat")

ws.onmessage = function(event){
    let data = JSON.parse(event.data)
    let sanitized = sanitizeHTML(data.data)
    let rendered = renderTex(sanitized)
    messages.appendChild(createMessageNode(rendered, data.id, sanitized))
    messages.scrollTop = messages.scrollHeight
    messageBuffer[data.id] = sanitized
}

function sendMessage(message){
    ws.send(message)
}