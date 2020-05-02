import { saveXpEntry } from './save-xp-entry'

function checkOrder(id) {
    let nOfCorrectItems = 0;

    let container = document.getElementById(id);

    if (container) {
        for (let i=0; i<container.children.length; i++) {
            if (container.children[i].getAttribute("name") === Student.ActiveResource.resourcesOrder[id][i]+"") {
                nOfCorrectItems++;

                if (container.children[i].getAttribute("value") === "0") {
                    let check = document.createElement("span");
                    check.classList.add("order-check", "glyphicon", "glyphicon-ok", "pull-right", "text-success");
                    check.setAttribute("aria-hidden", "true");
                    container.children[i].append(check);
                    container.children[i].setAttribute("value", "1");
                }
            } else {
                $(container.children[i]).children(".order-check").remove();
                container.children[i].setAttribute("value", "0");
            }
        }
    }

    if (nOfCorrectItems == Student.ActiveResource.resourcesOrder[id].length) {
        notify(string.activeResources.right, 'success', false);
        saveXpEntry(id);
    } else {
        notify(string.activeResources.oneOrMoreWrong, 'danger', false);
    }
}

export { checkOrder }
