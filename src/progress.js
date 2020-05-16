import { get } from "./http";

const container = document.getElementById("user2");
container.innerHTML = "";

const levelTextStyle = "color:white;font-size:smaller;font-style:italic;position:absolute;top:2px;right:6px;"
const ownedMaterialTextStyle = "color:white;font-size:smaller;font-style:italic;position:absolute;top:20px;right:6px;"
const materialTextStyle = "color:white;font-size:smaller;font-style:italic;position:absolute;top:38px;right:6px;"
const containerStyle = "overflow:hidden;height:18px;margin-bottom:0;background-color:#bb3444;-webkit-box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.1);box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);border-radius:0"

const levelProgressContainer = document.createElement("div");
const ownedMaterialProgressContainer = document.createElement("div");
const materialProgressContainer = document.createElement("div");

const levelProgressBar = document.createElement("div");
const ownedMaterialProgressBar = document.createElement("div");
const materialProgressBar = document.createElement("div");

const levelText = document.createElement("span");
const ownedMaterialText = document.createElement("span");
const materialText = document.createElement("span");

levelProgressContainer.appendChild(levelProgressBar)
ownedMaterialProgressContainer.appendChild(ownedMaterialProgressBar)
materialProgressContainer.appendChild(materialProgressBar)

levelProgressContainer.appendChild(levelText)
ownedMaterialProgressContainer.appendChild(ownedMaterialText)
materialProgressContainer.appendChild(materialText)

levelProgressContainer.classList.add("progress");
ownedMaterialProgressContainer.classList.add("progress");
materialProgressContainer.classList.add("progress");

levelProgressContainer.setAttribute("style", containerStyle);
ownedMaterialProgressContainer.setAttribute("style", containerStyle);
materialProgressContainer.setAttribute("style", containerStyle);

levelProgressBar.classList.add("progress-bar", "progress-bar-primary");
ownedMaterialProgressBar.classList.add("progress-bar", "progress-bar-info");
materialProgressBar.classList.add("progress-bar", "progress-bar-success");

levelProgressBar.setAttribute("role", "progressbar");
ownedMaterialProgressBar.setAttribute("role", "progressbar");
materialProgressBar.setAttribute("role", "progressbar");

levelProgressBar.setAttribute("aria-valuemin", "0");
ownedMaterialProgressBar.setAttribute("aria-valuemin", "0");
materialProgressBar.setAttribute("aria-valuemin", "0");

levelProgressBar.setAttribute("aria-valuemax", "1");
ownedMaterialProgressBar.setAttribute("aria-valuemax", "1");
materialProgressBar.setAttribute("aria-valuemax", "1");

levelProgressBar.setAttribute("aria-valuenow", "0");
ownedMaterialProgressBar.setAttribute("aria-valuenow", "0");
materialProgressBar.setAttribute("aria-valuenow", "0");

levelProgressBar.setAttribute("style", "width: 0%");
ownedMaterialProgressBar.setAttribute("style", "width: 0%");
materialProgressBar.setAttribute("style", "width: 0%");

levelText.setAttribute("style", levelTextStyle);
ownedMaterialText.setAttribute("style", ownedMaterialTextStyle);
materialText.setAttribute("style", materialTextStyle);

container.appendChild(levelProgressContainer);
container.appendChild(ownedMaterialProgressContainer);
container.appendChild(materialProgressContainer);

function displayUserProgress() {
    get("xp/progression", progress => {
        progress.overLevel = Auth.userData.progressionOverLevel;

        levelProgressBar.setAttribute("aria-valuenow", `"${progress.overLevel}"`);
        ownedMaterialProgressBar.setAttribute("aria-valuenow", `"${progress.overOwned}"`);
        materialProgressBar.setAttribute("aria-valuenow", `"${progress.overTotal}"`);

        levelProgressBar.setAttribute("style", `width: ${progress.overLevel*100}%;position:absolute;height:33%;`);
        ownedMaterialProgressBar.setAttribute("style", `width: ${progress.overOwned*100}%;position:absolute;height:33%;`);
        materialProgressBar.setAttribute("style", `width: ${progress.overTotal*100}%;position:absolute;height:33%;`);

        levelText.innerText = `${Math.round(progress.overLevel*100)}${string.userPanelText.progressBars.level.title}`
        ownedMaterialText.innerText = `${Math.round(progress.overOwned*100)}${string.userPanelText.progressBars.ownedMaterial.title}`
        materialText.innerText = `${Math.round(progress.overTotal*100)}${string.userPanelText.progressBars.material.title}`

        levelProgressContainer.setAttribute("title", `${string.userPanelText.progressBars.level.text[0]}${Auth.userData.xp}${string.userPanelText.progressBars.level.text[1]}${Auth.userData.still}${string.userPanelText.progressBars.level.text[2]}${string.material.levels[Auth.userData.level + 1]}`);
        ownedMaterialProgressContainer.setAttribute("title", `${string.userPanelText.progressBars.ownedMaterial.text[0]}${Math.round(progress.overOwned*100)}${string.userPanelText.progressBars.ownedMaterial.text[1]}`);
        materialProgressContainer.setAttribute("title", `${string.userPanelText.progressBars.material.text[0]}${(progress.overTotal*100).toFixed(2)}${string.userPanelText.progressBars.material.text[1]}`);
    })
}

export { displayUserProgress }
