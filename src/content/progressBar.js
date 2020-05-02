import { get } from "../http";

let text = document.createElement("span");
let description = "";

const style = `
    position: fixed;
    bottom: 0;
    padding: 14px;
    left: 0;
    right: 0;
    height: 50px;
    background: var(--scale12);
    z-index: 97;
`

function addLessonProgressBar() {
    let container = document.createElement("div")
    container.id = "lesson-progress-bar-container";
    container.setAttribute("style", style);
    let progressBarContainer = document.createElement("div");
    let progressBarElement = document.createElement("div");
    progressBarElement.id = "lesson-progress-bar";

    get(`eclass/progression/${Student.chapterNavigation.lessons[Student.chapterNavigation.index]}/${Auth.userData._id}`, res => {
        if (res.message) return;

        progressBarElement.setAttribute("aria-valuenow", `${res.progression}`);
        progressBarElement.setAttribute("style", `min-width: 2em; width: ${res.progression*100}%;`);
        text.innerText = `${Math.round(res.progression*100)}%`
        description = `${string.material.progression[0]}${Math.round(res.progression*100)}%${string.material.progression[1]}`;

        progressBarContainer.classList.add("progress");
        progressBarElement.classList.add("progress-bar");
        progressBarElement.setAttribute("role", "progressbar");
        progressBarElement.setAttribute("aria-valuemin", "0");
        progressBarElement.setAttribute("aria-valuemax", "1");
        container.setAttribute("title", description);

        container.append(progressBarContainer);
        progressBarContainer.append(progressBarElement);
        progressBarElement.append(text);
        
        document.body.append(container);
    })
}

function updateLessonProgressBar() {
    get(`eclass/progression/${Student.chapterNavigation.lessons[Student.chapterNavigation.index]}/${Auth.userData._id}`, res => {
        let container = document.getElementById("lesson-progress-bar-container");
        let progressBar = document.getElementById("lesson-progress-bar");

        if (container && progressBar) {
            text.innerText = `${Math.round(res.progression*100)}%`;
            container.setAttribute("title", `${string.material.progression[0]}${Math.round(res.progression*100)}%${string.material.progression[1]}`);
            progressBar.setAttribute("style", `min-width: 2em; width: ${res.progression*100}%;`);
        }
    });
}

export { addLessonProgressBar, updateLessonProgressBar }
