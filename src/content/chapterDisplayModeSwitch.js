import { showLevels } from './showLevels';
import { showThemes } from './showThemes';

let UISwitch = document.getElementById("classroom-content-navigation-display-type-switch");

let showingThemes = false;

let root = document.createElement("div");
let text = document.createElement("p");
let textKeyWord = document.createElement("span");
let swtch = document.createElement("div");
let circle = document.createElement("div");

text.innerText = string.material.groupingChaptersBy;
textKeyWord.innerText = string.material.levelLowerCase;

root.setAttribute("style", "display:none;");
text.setAttribute("style", "float:left;margin-right:8px;font-style:italic;color:#807f7d;");
textKeyWord.setAttribute("style", "color:#2e92cc;font-weight:bold");
swtch.setAttribute("style", "background-color:#c3c2bb;width:38px;height:26px;float:right;border-radius:13px;cursor:pointer;");
setShowByLevelStyles();

text.appendChild(textKeyWord)
swtch.appendChild(circle);
root.appendChild(text);
root.appendChild(swtch);

// behavior
swtch.addEventListener("click", () => {
    if (showingThemes) {
        setShowByLevelStyles();
        textKeyWord.innerText = string.material.levelLowerCase;
        showLevels();
    } else {
        setShowByThemeStyles()
        textKeyWord.innerText = string.material.themeLowerCase;
        showThemes();
    }

    showingThemes = !showingThemes;
});

function addSwitchToUI() {
    UISwitch.appendChild(root);
}

function setShowByThemeStyles() {
    circle.setAttribute("style", "background-color:#564092;width:20px;height:20px;border-radius:10px;margin-top:3px;margin-left:3px;position:absolute");
}

function setShowByLevelStyles() {
    circle.setAttribute("style", "background-color:#564092;width:20px;height:20px;border-radius:10px;margin-top:3px;margin-left:14px;position:absolute");
}

function hideMaterialDisplayModeSwitch() {
    root.setAttribute("style", "display:none;");
}

function showMaterialDisplayModeSwitch() {
    root.setAttribute("style", "display:block;float:right;");
}

export { addSwitchToUI, hideMaterialDisplayModeSwitch, showMaterialDisplayModeSwitch }
