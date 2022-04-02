let equationSearchPattern = /(?<=\$)(.*?)(?=\$)/
let textSplitPattern = /\$.*?\$/

function renderTex(input){
    let match = input.match(textSplitPattern)
    console.log("input " + input)
    while(match != null){
        input = input.replace(match[0], katex.renderToString(match[0].substr(1, match[0].length-2)))
        match = input.match(textSplitPattern)
    }
    return input
}
