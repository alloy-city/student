let messageBox = document.getElementById("messages")

if (Auth.userData.messages && Auth.userData.messages.length > 0){
    for (let message of Auth.userData.messages){
        if (message.type == "product_suggestion"){
            show(`${string.messages.suggestion[0]} <a onclick="Student.Product.view('${message.message}')" role="button">${string.messages.suggestion[1]}</a>`, message._id)
        } else if (message.type == "mission_assessed"){
            show(`${message.message}`, message._id)
        }
    }
}

function show (message, id) {
    // console.log("evidence: ", message)
    // messageBox.innerHTML = ""

    let markup = `
        <div id="${id}" class="alert alert-info" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            ${message}
        </div>`

    messageBox.appendChild(htmlToElement(markup))
}

function hideAll (){
    messageBox.innerHTML = ""
}

export { show, hideAll }