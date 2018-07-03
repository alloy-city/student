function addBackToTopButton(){
    let display = document.getElementById("classroom-display-eclass")

    let button = document.createElement("h1")
    button.classList.add("text-right")
    button.innerHTML = `<span class="glyphicon glyphicon-chevron-up" aria-hidden="true" role="button"></span>`
    button.addEventListener("click", () => {
        display.scrollIntoView()
    })

    display.appendChild(button)
}

export { addBackToTopButton }
