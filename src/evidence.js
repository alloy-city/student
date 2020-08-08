import { viewMission, consumeAll } from "./viewMission";

let messageBox = document.getElementById("messages");

if (Auth.userData.messages && Auth.userData.messages.length > 0){
    let productSuggestionMessages = '';
    let missionAssessedMessages = '';
    let missionAssessedIds = [];

    for (let message of Auth.userData.messages){
        if (message.type == "product_suggestion"){
            productSuggestionMessages += `${string.messages.suggestion[0]} <a onclick="Student.Product.view('${message.message}')" role="button">${string.messages.suggestion[1]}</a><br>`;
        } else if (message.type == "mission_assessed"){
            missionAssessedMessages += `<span id="${message._id}"><span class="text-success">${message.message.teacher_name}</span> ${string.messages.missionAssessed[0]} <a onclick="Student.viewMission('${message.message.lesson_id}', '${message.message.question_id}', '${message._id}')" role="button"><b>${string.messages.missionAssessed[1]}</b></a>.<br></span>`;

            missionAssessedIds.push(message._id);
        }
    }

    if (productSuggestionMessages.length > 0) show(productSuggestionMessages);
    if (missionAssessedMessages.length > 0) showMissionAssessed(missionAssessedMessages, missionAssessedIds);
}

function showMissionAssessed(message, missionAssessedIds) {
    let root = document.createElement("div");
    root.setAttribute("class", "alert alert-info");
    root.setAttribute("role", "alert");
    root.setAttribute("id", "mission-assessed-messages");
    
    let viewAllButton = document.createElement("button");
    viewAllButton.setAttribute("type", "button");
    viewAllButton.setAttribute("class", "btn btn-info");
    viewAllButton.setAttribute("style", "margin-top: 20px;");
    viewAllButton.innerText = string.buttons.setAllAsViewed;
    
    if (missionAssessedIds.length > 1) {
        viewAllButton.addEventListener("click", () => {
            consumeAll(missionAssessedIds, () => {
                if (root) root.remove();
                if (div1) div1.remove();
            });

            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            let div3 = document.createElement("div");

            let centerX = root.offsetLeft + root.offsetWidth / 2;
            let centerY = root.offsetTop + root.offsetHeight / 2;

            div1.setAttribute("class", "lds-ripple");
            div1.setAttribute("style", `position:absolute;display:inline;left:${centerX - 72/2}px;top:${centerY  - 72/2}px;`);
            div1.appendChild(div2);
            div1.appendChild(div3);

            root.setAttribute("style", "opacity:0.5");
            
            document.body.appendChild(div1);
        });
    }

    let xButton = document.createElement("button");
    xButton.setAttribute("type", "button");
    xButton.setAttribute("class", "close");
    xButton.setAttribute("data-dismiss", "alert");
    xButton.setAttribute("aria-label", "Close");

    let xSpan = document.createElement("span");
    xSpan.setAttribute("aria-hidden", "true");
    xSpan.innerText = 'x';

    root.innerHTML = message;
    root.prepend(xButton);
    xButton.append(xSpan);

    if (missionAssessedIds.length > 1) root.appendChild(viewAllButton);
    
    messageBox.appendChild(root);

    // let markup = `
    //     <div class="alert alert-info" role="alert">
    //         <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    //         ${message}
    //     </div>`;

    // messageBox.appendChild(htmlToElement(markup))
}

function show (message) {
    let markup = `
        <div class="alert alert-info" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            ${message}
        </div>`

    messageBox.appendChild(htmlToElement(markup))
}

function markAllAsSeen(){

}

function hideAll (){
    messageBox.innerHTML = ""
}

export { show, hideAll }
