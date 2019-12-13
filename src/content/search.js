import * as http from "../http";
import { hasAccessLessons } from "./hasAccess";
let input = document.getElementById("didactic-material-search");
let list = document.getElementById("didactic-material-search-results");

function search() {
    console.log(input.value);
    console.log(encodeURIComponent(input.value));
    http.get(`search/material/${encodeURIComponent(input.value)}`, listResults);
}

function owns(_id) {
    for (let i=0; i<Auth.userData.hasAccessTo.length; i++) {
        if (Auth.userData.hasAccessTo[i].eclass && Auth.userData.hasAccessTo[i].eclass === _id) return true;
        if (Auth.userData.hasAccessTo[i]._id && Auth.userData.hasAccessTo[i]._id === _id) return true;
    }

    return false;
}

function listResults(results) {
    if (results && results.nOfResults) {
        list.innerHTML = "";
        let m = "<div>"
        for (let chapter of results.chapters) {
            console.log(chapter);
            m += `<div class="product-search-result"><h3><small><span class="text-muted glyphicon glyphicon-book" aria-hidden="true" title="### Capítulo"></span></small> ${chapter.title}</h3>`;
            m += `<p class="text-muted"><i><small>${chapter._id}</small></i></p>`;
            if (owns(chapter._id) || chapter.price == 0 || hasAccessLessons(chapter.lessons)) m += `<span class="label label-success" role="button">${string.buttons.enter}</span>`;
            else m += `<span class="label label-primary" role="button">${string.buttons.buy}</span> <span class="label label-success" role="button">${string.buttons.enter}</span>`;
            m += `<p>${chapter.description}</p></div>`;
        }

        for (let lesson of results.lessons) {
            console.log(lesson);
            m += `<div class="product-search-result"><h3><small><span class="text-muted glyphicon glyphicon-blackboard" aria-hidden="true" title="### Lição"></span></small> ${lesson.title}</h3>`;
            m += `<p class="text-muted"><i><small>${lesson._id}</small></i></p>`;

            if (owns(lesson._id)) m += `<span class="label label-success" role="button">${string.buttons.enter}</span>`;
            else m += `<span class="label label-primary" role="button">${string.buttons.buy}</span>`;
            m += `<p>${lesson.subtitle}</p>`;
        }

        m += "</div>"

        list.appendChild(htmlToElement(m));
    }
}

function setSearchListener() {
    console.log("setSearchListener called");
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        } else if (event.key === "Escape") {
            console.log("CLEAR results and search text");
            list.innerHTML = "";
            input.value = "";
        } else if (event.key === "Backspace") {
            console.log("CLEAR results");
            list.innerHTML = "";
        }
    });

    input.nextElementSibling.children[0].addEventListener("click", search);
}

export { setSearchListener }
