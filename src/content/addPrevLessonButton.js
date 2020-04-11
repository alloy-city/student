function addPrevLessonButton() {
    if (Student.chapterNavigation.index == 0) return;

    let display = document.getElementById("material-display-eclass")

    let button = document.createElement("h1")
    button.classList.add("text-right")
    button.innerHTML = `<button type="button" class="btn btn-default" aria-label="Left Align">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Lição precedente
                        </button>`
    button.addEventListener("click", () => {
        Student.chapterNavigation.prev()
    })

    display.appendChild(button)
}

export { addPrevLessonButton }
