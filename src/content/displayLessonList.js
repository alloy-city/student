import { hasAccess } from "./hasAccess";
import { selectEclassToStudy } from '../content';
import { showChaptersByLevel } from './showChaptersByLevel';
import { showChapters } from './showChapters';

function compare(a, b) {
    if (a.title < b.title)
        return -1;
    if (a.title > b.title)
        return 1;
    return 0;
}

function displayLessonList(chapter, lessons, ownsAll, goBackInstructions) {
    let title = document.getElementById("classroom-content-navigation-title")
    let description = document.getElementById("classroom-content-navigation-description")
    let container = document.getElementById("classroom-content-navigation-display")

    title.innerText = chapter.title
    description.innerText = chapter.description

    lessons.sort(compare)

    for(let i=0; i<lessons.length; i++) {
        Student.chapterNavigation.lessons[i] = lessons[i]._id;
    }

    // go back button
    let goBackButton = document.createElement("button");
    goBackButton.setAttribute("type", "button");
    goBackButton.setAttribute("class", "btn btn-primary");
    goBackButton.innerHTML = `<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>${string.buttons.goBack}`
    
    if (goBackInstructions.organizedByLevel) {
        goBackButton.addEventListener("click", () => { showChaptersByLevel(goBackInstructions.level) })
    } else {
        goBackButton.addEventListener("click", () => { showChapters(goBackInstructions.theme) })
    }

    let lessonsLabelRoot = document.createElement("div");
    let lessonsLabelLeft = document.createElement("div");
    let lessonsLabelRight = document.createElement("div");
    let lessonsLabelText = document.createElement("p");

    lessonsLabelRoot.setAttribute("style", "display:flex;justify-content: space-around;margin: 20px 0 20px;align-items: center;")
    lessonsLabelLeft.setAttribute("style", "height: 1px;background-color: #c3c3c3;width: 100%;");
    lessonsLabelRight.setAttribute("style", "height: 1px;background-color: #c3c3c3;width: 100%;");
    lessonsLabelText.setAttribute("style", "font-style: italic;font-size: 0.8em;color: grey;margin: 0 7px;");

    lessonsLabelRoot.appendChild(lessonsLabelLeft);
    lessonsLabelRoot.appendChild(lessonsLabelText);
    lessonsLabelRoot.appendChild(lessonsLabelRight);

    lessonsLabelText.innerText = string.material.lessonsUpperCase;

    // clear content container
    container.innerHTML = ""
    
    let listOfLessons = document.createElement("div");
    
    for (let i=0; i<lessons.length; i++){
        let lesson = lessons[i];

        let root = document.createElement("div");
        let leftSide = document.createElement("div");
        let rightSide = document.createElement("div");
        let coverImage = document.createElement("img");
        let title = document.createElement("p");
        let description = document.createElement("p");
        let progressBarContainer = document.createElement("div");
        let progressBar = document.createElement("div");

        // content
        title.innerText = lesson.title;
        description.innerText = lesson.subtitle;

        // styles
        root.setAttribute("style", "display:flex;margin-bottom: 20px;padding-bottom: 20px;border-bottom-color: #75be88;border-bottom-width: 1px;border-bottom-style: solid;");
        rightSide.setAttribute("style", "width: 100%;margin-left: 20px;display: flex;flex-direction: column;justify-content: space-between;");
        coverImage.setAttribute("style", "width: 100%;height: 100%;max-width: 100px;max-height: 100px;min-width: 50px;min-height: 50px;clear: both;");
        coverImage.setAttribute("src", `/images/lesson-icons/${lesson.icon ? lesson.icon : "lesson-no-icon_v2.png"}`);
        coverImage.setAttribute("alt", "Lesson cover image");
        title.setAttribute("style", "color: #75be88;font-family: 'Abraham', sans-serif;font-size: 1.4em;");
        description.setAttribute("style", "color: grey;font-family: 'Bariol', sans-serif;font-size: 1.1em;");
        progressBarContainer.setAttribute("class", "progress");
        progressBarContainer.setAttribute("style", "height:6px;margin-top:5px;margin-bottom: 0;");
        progressBar.setAttribute("class", "progress-bar");
        progressBar.setAttribute("role", "progressbar");
        
        // other attributes
        let progress = lesson.progression === -1 ? 100 : lesson.progression*100;
        progressBar.setAttribute("aria-valuenow", progress);
        progressBar.setAttribute("aria-valuemin", "0");
        progressBar.setAttribute("aria-valuemax", "100");
        progressBar.setAttribute("style", `width: ${progress}%;`);
        progressBar.innerHTML = `<span class="sr-only">${progress}% Complete</span>`;
        
        // assemble
        root.appendChild(leftSide);
        root.appendChild(rightSide);
        leftSide.appendChild(coverImage);
        rightSide.appendChild(title);
        rightSide.appendChild(description);
        rightSide.appendChild(progressBarContainer);
        progressBarContainer.appendChild(progressBar);
        listOfLessons.appendChild(root);

        // behavior
        if (hasAccess(lesson._id) || ownsAll || lesson.price == 0) {
            root.addEventListener("click", () => { selectEclassToStudy(i) });
            root.setAttribute("style", "display:flex;margin-bottom: 20px;padding-bottom: 20px;border-bottom-color: #75be88;border-bottom-width: 1px;border-bottom-style: solid;cursor:pointer")
        }
    }

    container.appendChild(goBackButton);
    container.appendChild(lessonsLabelRoot);
    container.appendChild(listOfLessons);
}

export { displayLessonList };
