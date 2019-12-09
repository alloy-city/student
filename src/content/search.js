import * as http from "../http";
let input = document.getElementById("didactic-material-search");

function search() {
    console.log(input.value);
    console.log(encodeURIComponent(input.value));
    http.get(`search/material/${encodeURIComponent(input.value)}`, listResults);
}

function listResults(results) {
    console.log(results);
}

function setSearchListener() {
    console.log("setSearchListener called");
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    });

    input.nextElementSibling.children[0].addEventListener("click", search);
}

export { setSearchListener }
