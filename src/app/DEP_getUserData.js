export function getUserData(){ // DEPRECATED: Set userData object in localStorage at login.
  console.log("getUserData() has been called.")
  
  $.get( "http://fr.eloquatranslations.com/php/get_user_data.php", function(data) {
    console.log(data);
    userData = JSON.parse(data)[0];

    userData.xp = Number(userData.arbitraryXp) + Number(userData.earnedXp);

  	var level = 0;
  	var nextLevel = 1;
  	var still = 0;
    var debt = userData.debt;

    // mailing list
    console.log("TEST", userData);
    if (Number(userData.mailingList) == 0){
      document.getElementById('settings-mailing-list').checked = false;
    } else {
      document.getElementById('settings-mailing-list').checked = true;
    }

    if (userData.debt > 0){
    	setPayment();
    	showPayButton();
    }

    getMongoXP();
  });
}

export function getMongoXP () {
  var url = "http://"+serverIp+":5014/api/xp/"+userData.id;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "GET"
  }
  $.ajax(settings).done(function (res) {
    // console.log('getUserData.getMongoXP', res);
    if (res[0]) userData.xp = Number(userData.arbitraryXp) + Number(userData.earnedXp) + res[0].xp;

    userDisplay();
    eloquaVids();
    whatsAppGroups();
    getGroups();
    getMissions();
    settingsText();
    classroomGetLatestEclasses();
    SocketEClassConnect();
    setGrenadineLinks();
  });
}

export function updateXpOnly(){
  var url = "http://"+serverIp+":5014/api/xp/"+userData.id;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "GET"
  }
  $.ajax(settings).done(function (res) {
    console.log('getUserData.updateXpOnly', res);
    if (res[0]) userData.xp = Number(userData.arbitraryXp) + Number(userData.earnedXp) + res[0].xp;
    userDisplay();
  });
}
