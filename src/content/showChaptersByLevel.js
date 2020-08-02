import { hasAccess, hasAccessLessons } from "./hasAccess";
import { prepareChapterDescription } from './prepareChapterDescription';
import { hideMaterialDisplayModeSwitch } from './chapterDisplayModeSwitch';
import { openThisChapter } from './openThisChapter';
import { showLevels } from './showLevels';
import { view } from "../product";

let title = document.getElementById("classroom-content-navigation-title");
let description = document.getElementById("classroom-content-navigation-description");
let display = document.getElementById("classroom-content-navigation-display");

let goBackButton = document.createElement("button");

goBackButton.setAttribute("type", "button");
goBackButton.setAttribute("class", "btn btn-primary");
goBackButton.addEventListener("click", () => { showLevels() });

goBackButton.innerHTML = `<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>${string.buttons.goBack}`

function showChaptersByLevel(level) {
    console.log(level);

    hideMaterialDisplayModeSwitch();

    document.getElementById("material-display-history").innerHTML = "";
    Student.Content.setTheme(0);

    title.innerText = level.name;
    description.innerText = level.description;

    let cardsContainer = document.createElement("div");
    cardsContainer.setAttribute("class", "row");

    for (let i = 0; i < level.chapters.length; i++) {

        let root = document.createElement("div");
        let card = document.createElement("div");
        let coverImage = document.createElement("img");
        let chapterTitle = document.createElement("h4");
        let chapterDescription = document.createElement("p");
        let price = document.createElement("h3");
        let buyButton = document.createElement("button");
        let openButton = document.createElement("button");

        root.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 col-lg-3");
        card.setAttribute("class", "thumbnail chapter-card");
        coverImage.setAttribute("src", `/images/chapter-icons/${level.chapters[i].icon ? level.chapters[i].icon : "chapter-no-icon.png"}`);
        coverImage.setAttribute("alt", "chapter cover image");
        buyButton.setAttribute("class", "btn btn-primary btn-sm");
        buyButton.setAttribute("type", "button");
        buyButton.setAttribute("style", "margin-right: 7px;");
        openButton.setAttribute("class", "btn btn-default btn-sm");
        openButton.setAttribute("type", "button");

        chapterTitle.innerText = level.chapters[i].title;
        chapterDescription.innerText = prepareChapterDescription(level.chapters[i].description);
        openButton.innerText = string.commons.open;
        buyButton.innerText = string.buttons.buy;

        root.appendChild(card);
        card.appendChild(coverImage);
        card.appendChild(chapterTitle);
        card.appendChild(chapterDescription);
        card.appendChild(price);

        buyButton.addEventListener("click", () => { view(level.chapters[i]._id) })

        if (hasAccess(level.chapters[i]._id) || level.chapters[i].price == 0 || hasAccessLessons(level.chapters[i].lessons)){
            openButton.classList.add("pull-right");
            price.innerHTML = "<br>";
            openButton.addEventListener("click", () => { openThisChapter(level.chapters[i], true, level) })
        } else {
            price.innerHTML = numberToBRL(level.chapters[i].price);
            openButton.addEventListener("click", () => { openThisChapter(level.chapters[i], false, level) })
            card.appendChild(buyButton);
        }

        card.appendChild(openButton);
        cardsContainer.appendChild(root);
    }

    display.innerHTML = "";
    display.appendChild(goBackButton);
    display.appendChild(cardsContainer);
}

export { showChaptersByLevel }
