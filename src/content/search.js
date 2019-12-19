import * as http from "../http";
import { hasAccessLessons } from "./hasAccess";
let input = document.getElementById("didactic-material-search");
let list = document.getElementById("didactic-material-search-results");

function search() {
    http.get(`search/material/${encodeURIComponent(input.value)}`, listResults);
}

function owns(_id) {
    for (let i=0; i<Auth.userData.hasAccessTo.length; i++) {
        if (Auth.userData.hasAccessTo[i].eclass && Auth.userData.hasAccessTo[i].eclass == _id) return true;
        if (Auth.userData.hasAccessTo[i]._id && Auth.userData.hasAccessTo[i]._id == _id) return true;
    }

    return false;
}

function listResults(results) {
    if (results && results.nOfResults) {
        list.innerHTML = "";
        let m = "<div>"
        for (let chapter of results.chapters) {
            m += `<div class="product-search-result"><h3><small><span class="text-muted glyphicon glyphicon-book" aria-hidden="true" title="${string.material.chapter}"></span></small> ${chapter.title}</h3>`;
            m += `<p class="text-muted"><i><small>${chapter._id}</small></i></p>`;
            if (owns(chapter._id) || chapter.price == 0 || hasAccessLessons(chapter.lessons)) m += `<span class="label label-success" onclick="Student.Content.setTheme(${chapter.theme}); Student.Content.search.clearSearch(); Student.Content.openChapter(${chapter.theme}, '${chapter._id}', ${hasAccessLessons(chapter.lessons)})" role="button">${string.buttons.enter}</span>`;
            else m += `<span class="label label-primary" onclick="Student.Product.view('${chapter._id}')" role="button">${string.buttons.buy}</span> <span class="label label-success" onclick="Student.Content.setTheme(${chapter.theme}); Student.Content.search.clearSearch(); Student.Content.openChapter(${chapter.theme}, '${chapter._id}', ${hasAccessLessons(chapter.lessons)})" role="button">${string.buttons.enter}</span>`;
            m += `<p>${chapter.description}</p></div>`;
        }

        for (let lesson of results.lessons) {
            m += `<div class="product-search-result"><h3><small><span class="text-muted glyphicon glyphicon-blackboard" aria-hidden="true" title="${string.material.lesson}"></span></small> ${lesson.title}</h3>`;
            m += `<p class="text-muted"><i><small>${lesson._id}</small></i></p>`;

            if (owns(lesson._id) || lesson.price === 0) m += `<span class="label label-success" onclick="Student.Content.selectEclassToStudy('${lesson._id}');" role="button">${string.buttons.enter}</span>`;
            else m += `<span class="label label-primary" onclick="Student.Product.view('${lesson._id}')" role="button">${string.buttons.buy}</span>`;
            m += `<p>${lesson.subtitle}</p></div>`;
        }

        m += "</div>"

        list.appendChild(htmlToElement(m));
    }
}

function clearSearch() {
    list.innerHTML = "";
}

function setSearchListener() {
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        } else if (event.key === "Escape") {
            list.innerHTML = "";
            input.value = "";
        } else if (event.key === "Backspace") {
            list.innerHTML = "";
        }
    });

    input.nextElementSibling.children[0].addEventListener("click", search);
}

export { setSearchListener, clearSearch }
