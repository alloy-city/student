import { themeIcons } from '../theme-icons';
import { history } from './history';
import { showMaterialDisplayModeSwitch } from './chapterDisplayModeSwitch';
import { showChaptersByLevel } from './showChaptersByLevel';

let display = document.getElementById("classroom-content-navigation-display");

let levels = [];

function setLevels(callback) {
    string.material.levels.forEach(level => {
        levels.push({
            name: level.name,
            CEFRL: level.CEFRL,
            description: level.description,
            chapters: new Array()
        })
    });

    callback();
}

function setLevelChapters() {
    for (let i=0; i<Auth.chapters.length; i++) {
        if (!Auth.chapters[i]) continue;
    
        for (let j=0; j<Auth.chapters[i].length; j++) {
            levels[Auth.chapters[i][j].level].chapters.push(Auth.chapters[i][j]);
        }
    }
}

export function showLevels() {
    console.log("showLevels !!")

    if (levels.length == 0) {
        setLevels(() => {
            setLevelChapters();
        });
    }

    showMaterialDisplayModeSwitch();

    document.getElementById("classroom-content-navigation-display").innerHTML = "";
    $("#classroom-content-navigation-title").html(string.material.organizeByLevelTitle);
    $("#classroom-content-navigation-description").html(string.material.organizeByLevelDescription);

    for (let i=0; i<levels.length; i++) {
        if (levels[i].chapters.length > 0) {
            // create UI elements
            let root = document.createElement("div");
            let levelName = document.createElement("p");
            let levelDescription = document.createElement("p");
            let levelCRFRL = document.createElement("span");
            let nOfChapters = document.createElement("p");

            // set text
            levelName.innerText = levels[i].name;
            levelDescription.innerText = levels[i].description;
            levelCRFRL.innerText = levels[i].CEFRL;
            nOfChapters.innerText = `${levels[i].chapters.length} ${string.material.chapterLowerCasePlural}`;

            // assemble
            root.appendChild(levelName);
            levelName.appendChild(levelCRFRL);
            root.appendChild(levelDescription);
            root.appendChild(nOfChapters);

            // set styles
            root.setAttribute("style", "padding:20px;background-color:white;width:100%;-webkit-box-shadow: 0px 3px 5px 0px rgba(82,73,39,0.4);-moz-box-shadow: 0px 3px 5px 0px rgba(82,73,39,0.4);box-shadow: 0px 3px 5px 0px rgba(82,73,39,0.4);border-radius:5px;margin: 18px 0 18px;cursor:  pointer;");
            levelName.setAttribute("style", `color: #76bf89;font-family: "Abraham", sans-serif;font-size: 1.5em;`);
            levelDescription.setAttribute("style", "color:grey;font-size: 1.2em;margin-top: 7px;");
            levelCRFRL.setAttribute("style", "color: #4e4e4e;font-family: 'Bariol', sans-serif;font-size: 0.8em;margin-left: 10px;");
            nOfChapters.setAttribute("style", "color: grey;text-align: right;font-style: italic;margin-bottom: -7px;");

            // define behavior
            root.addEventListener("click", () => {
                showChaptersByLevel(levels[i]);
            })

            display.appendChild(root);
        }
    }

    document.getElementById("material-display-history").innerHTML = "";
    history();
}
