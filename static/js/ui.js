function keyPressHandler(e) {
    if (e.code == "Enter" && !e.shiftKey && messageBox.value.trim() != "") {
        messageText = messageBox.value
        sendMessage(messageText)
        messageBox.value = ""
        previewBox.innerHTML = ""
    }
}

messageBox.addEventListener("keyup", function (e) {
    previewBox.style.display = "block";
    messageText = messageBox.value
    sanitized = sanitizeHTML(messageText)
    previewBox.innerHTML = `Preview: <br> ${renderTex(sanitized)}`
    if (messageBox.value.trim() == ""){
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
    // console.log(this.selectionStart)
    // words = this.value.split(" ")
    // // curword = words[words.length-1]
    let curword = ""
    for (let i = this.selectionStart - 1; i >= 0; i--) {
        if (this.value[i] === "\\") {
            i = i - 1;
            if (this.selectionStart - i <= 1) {
                return;
            }
            let cur_idx = this.selectionEnd;
            // console.log(this.value);
            // console.log(`i is ${i}, sstart is ${this.selectionStart}`)
            curword = this.value.substring(i + 1, this.selectionStart);

            // console.log(curword)
            let restOfTheString = this.value.substring(0, i + 1) + this.value.substring(this.selectionStart, this.value.length)
            for (let el of texts) {
                if (el.startsWith(curword)) {
                    this.value = this.value.substring(0, i + 1) + el + this.value.substring(this.selectionStart, this.value.length)
                    let factor = 0
                    if (el.endsWith("{}{}")){
                        factor = 3
                    } else if(el.endsWith("{}")){
                        factor = 1
                    }
                    this.selectionStart = cur_idx + el.length - curword.length - factor
                    this.selectionEnd = cur_idx + el.length - curword.length - factor
                }
            }
            // console.log(restOfTheString)

            break;
        }
    }

    /*for (let el of texts){
          if (el.startsWith(curword)){
         this.value += 	el.substr(curword.length, el.length);
      }
    }*/
});

function showSource(inp){
    let sourcediv = document.getElementById(`sid${inp}`)
    if (sourcediv.style.display == "none"){
        sourcediv.style.display = "block"
    } else {
        sourcediv.style.display = "none"
    }
}

function textAreaAdjust(element){
    if(element.value.split("\n").length < 2){
        return
    }
    element.style.height = "1px"
    element.style.height = (25+element.scrollHeight)+"px";
}

messageBox.addEventListener("keypress", keyPressHandler)
