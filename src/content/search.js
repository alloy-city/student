let input = document.getElementById("didactic-material-search");

function search() {
    console.log(input.value);
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
