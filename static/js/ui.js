function keyPressHandler(e) {
    if (e.code == "Enter" && !e.shiftKey && messageBox.value.trim() != "") {
        messageText = messageBox.value
        sendMessage(messageText)
        messageBox.value = ""
        previewBox.innerHTML = ""
    }
}
messageBox.addEventListener("keypress", keyPressHandler)

messageBox.addEventListener("keyup", function (e) {
    previewBox.style.display = "block";
    messageText = messageBox.value
    sanitized = sanitizeHTML(messageText)
    previewBox.innerHTML = `Preview: <br> ${renderTex(sanitized)}`
    if (messageBox.value.trim() == "") {
        messageBox.value = ""
        messageBox.style.height = "2rem"
        previewBox.style.display = "none";
        previewBox.innerHTML = "";
    }
});

const texts = ["\\frac{}{}", "\\epsilon", "\\nabla", "\\delta", "\\cdot", "\\vec{}", "\\alpha", "\\rho"]

messageBox.addEventListener("keydown", function (e) {
    if (e.key != "Tab") {
        return;
    }
    e.preventDefault()
    let curword = ""
    for (let i = this.selectionStart - 1; i >= 0; i--) {
        if (this.value[i] === "\\") {
            i = i - 1;
            if (this.selectionStart - i <= 1) {
                return;
            }
            let cur_idx = this.selectionEnd;
            curword = this.value.substring(i + 1, this.selectionStart);

            let restOfTheString = this.value.substring(0, i + 1) + this.value.substring(this.selectionStart, this.value.length)
            for (let el of texts) {
                if (el.startsWith(curword)) {
                    this.value = this.value.substring(0, i + 1) + el + this.value.substring(this.selectionStart, this.value.length)
                    let factor = 0
                    if (el.endsWith("{}{}")) {
                        factor = 3
                    } else if (el.endsWith("{}")) {
                        factor = 1
                    }
                    this.selectionStart = cur_idx + el.length - curword.length - factor
                    this.selectionEnd = cur_idx + el.length - curword.length - factor
                }
            }
            break;
        }
    }
});

function showSource(inp) {
    let sourcediv = document.getElementById(`sid${inp}`)
    if (sourcediv.style.display == "block") {
        sourcediv.style.display = "none"
    } else {
        sourcediv.style.display = "block"
    }
}

function textAreaAdjust(element) {
    if (element.value.split("\n").length < 2) {
        return
    }
    element.style.height = "1px"
    element.style.height = (25 + element.scrollHeight) + "px";
}

function copySourceToClipboard(id){
    let el = document.getElementById(`sid${id}`)
    let btn = document.getElementById(`scb${id}`)
    navigator.clipboard.writeText(el.innerText)
    btn.src = "static/img/task-completed.png"
    btn.style.opacity = "100%"
    btn.style.height = "20px"
}

function resetSourceCopyBtn(id){
    let btn = document.getElementById(`scb${id}`)
    btn.src = "static/img/outline_content_copy_black_18dp.png"
    btn.style.height = "15px"
}
