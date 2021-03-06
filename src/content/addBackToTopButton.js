function addBackToTopButton(){
    let display = document.getElementById("material-display-eclass")

    let button = document.createElement("h1")
    button.classList.add("text-right")
    button.innerHTML = `<button type="button" class="btn btn-default" aria-label="Left Align">
                            <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span> Voltar para o topo
                        </button>`
    button.addEventListener("click", () => {
        display.scrollIntoView()
    })

    display.appendChild(button)
}

export { addBackToTopButton }
