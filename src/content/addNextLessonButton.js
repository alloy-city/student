function addNextLessonButton() {
    if (Student.chapterNavigation.index == Student.chapterNavigation.lessons.length - 1) return;
    
    let display = document.getElementById("material-display-eclass")

    let button = document.createElement("h1")
    button.classList.add("text-right")
    button.innerHTML = `<button type="button" class="btn btn-default" aria-label="Left Align">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Próxima lição
                        </button>`
    button.addEventListener("click", () => {
        Student.chapterNavigation.next()
    })

    display.appendChild(button)
}

export { addNextLessonButton }
