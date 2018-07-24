let messageBox = document.getElementById("messages")

if (Auth.userData.messages && Auth.userData.messages.length > 0){
    for (let message of Auth.userData.messages){
        if (message.type == "product_suggestion"){
            show(`${string.messages.suggestion[0]} <a onclick="Student.Product.view('${message.message}')" role="button">${string.messages.suggestion[1]}</a>`, message._id)
        } else if (message.type == "mission_assessed"){
            console.log(message)
            show(`<span class="text-success">${message.message.teacher_name}</span> ${string.messages.missionAssessed[0]} <a onclick="Student.viewMission('${message.message.lesson_id}', '${message.message.question_id}', '${message._id}')" role="button"><b>${string.messages.missionAssessed[1]}</b></a>.`, message._id)
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