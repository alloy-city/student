import * as Animations from "./animations.js"

function userDisplay(){

	if (!Auth.userData.xp) {
		Auth.userData.xp = 0
	}

	var displayUserName = '';
	if (Auth.userData.nickname && Auth.userData.nickname.length > 0 && Auth.userData.nickname != "undefined"){
		displayUserName = Auth.userData.nickname;
	}
	else if (Auth.userData.name && Auth.userData.name.length > 0 && Auth.userData.name != "undefined"){
		displayUserName = Auth.userData.name;
	}
	else {
		displayUserName = Auth.userData.mainEmail;
	}
	document.getElementById('displayUserName').innerHTML = displayUserName;
	document.getElementById('smallScreenDisplayUserName').innerHTML = displayUserName;

	calculateLevel();

	userImg();
}

function updateXp(n) {
	Auth.userData.xp += n
	calculateLevel()
}

function userImg() {
	if (!Auth.userData.picture || Auth.userData.picture == "") {
		document.getElementById("userImg").src = '/images/noPicture.png';
	} else {
		document.getElementById("userImg").src = Auth.userData.picture;
	}
}

function calculateLevel() {
	if (Auth.userData.xp >= 60000) {
		// level = 8; //Jedi Master
		Auth.userData.level = 8;
	} else if (Auth.userData.xp >= 45000) {
		// level = 7; //Legend
		Auth.userData.level = 7;
		Auth.userData.still = (60000 - Auth.userData.xp);
	} else if (Auth.userData.xp >= 32000) {
		// level = 6; //Ninja
		Auth.userData.level = 6;
		Auth.userData.still = (45000 - Auth.userData.xp);
	} else if (Auth.userData.xp >= 22000) {
		// level = 5; //Monster
		Auth.userData.level = 5;
		Auth.userData.still = (32000 - Auth.userData.xp);
	} else if (Auth.userData.xp >= 13000) {
		// level = 4; //Insane
		Auth.userData.level = 4;
		Auth.userData.still = (22000 - Auth.userData.xp);
	} else if (Auth.userData.xp >= 8000) {
		// level = 3; //Explorer
		Auth.userData.level = 3;
		Auth.userData.still = (13000 - Auth.userData.xp);
	} else if (Auth.userData.xp >= 4000) {
		// level = 2; //Nerd
		Auth.userData.level = 2;
		Auth.userData.still = (8000 - Auth.userData.xp);
	} else if (Auth.userData.xp >= 1000) {
		// level = 1; //Apprentice
		Auth.userData.level = 1;
		Auth.userData.still = (4000 - Auth.userData.xp);
	} else {
		// level = 0; //Noob
		Auth.userData.level = 0;
		Auth.userData.still = (1000 - Auth.userData.xp);
	}
	getLoggedInText();
}

function getLoggedInText() {
	$('#displayUserLevel').text(string.material.levels[Auth.userData.level]);
	$('#displayUserXP').text(string.userPanelText.youHave + Auth.userData.xp + string.userPanelText.xps);

	Animations.animateElement($('#displayUserXP').parent(), 'rubberBand');

	if (Auth.userData.level != 8) {
		document.getElementById('displayUserNextLevel').innerHTML = string.userPanelText.still + Auth.userData.still + string.userPanelText.toGetTo + string.material.levels[Auth.userData.level + 1];
	}
}

export { userDisplay, updateXp }