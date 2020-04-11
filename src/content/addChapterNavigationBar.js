
function addChapterNavigationBar() {
    let display = document.getElementById("material-display-eclass")
    
    let bar = document.createElement("div")
    let prev, up, next;
    bar.classList.add("text-center");

    prev = document.createElement("a");
    prev.classList.add("pull-left")
    prev.setAttribute("role", "button");
    prev.innerHTML = `<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> ${string.commons.prevLesson}`;
    if (Student.chapterNavigation.index > 0) {
        prev.addEventListener("click", () => {
            Student.chapterNavigation.prev()
        })
    } else {
        prev.classList.add("invisible")
    }
    bar.append(prev);

    up = document.createElement("a");
    up.setAttribute("role", "button");
    up.innerHTML = `<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span> ${string.commons.goToTopOfLesson}`;
    up.addEventListener("click", () => {
        display.scrollIntoView()
    })
    bar.append(up);

    next = document.createElement("a");
    next.classList.add("pull-right")
    next.setAttribute("role", "button");
    next.innerHTML = `${string.commons.nextLesson} <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>`;
    if (Student.chapterNavigation.index < Student.chapterNavigation.lessons.length - 1) {
        next.addEventListener("click", () => {
            Student.chapterNavigation.next()
        })
    } else {
        next.classList.add("invisible")
    }
    bar.append(next);

    display.appendChild(bar)
}

export { addChapterNavigationBar }
