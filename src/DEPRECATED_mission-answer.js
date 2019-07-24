/*
function getUserText(missionId){
  // console.log(Auth.userData.id);
  // console.log(missionId);
  Auth.userData.missionId = missionId;

  $.ajax({
    url: "php/get-mission-user-text.php",
    data: {
      userID: Auth.userData.id,
      missionID: missionId
    }
  }).done(function(res) {
    if(res == 0){
      displayAnswer(string.missions.typeHere, '');
    }else{
      displayAnswer(unescape(res), unescape(res));
    }
  });
}

function displayAnswer(a, b){
  $.get("student/views/mission-text.html", function(data){
    $('#missionAnswer').html(data);
    $('#mission-report-title').text(string.missions.missionReportTitle);
    $('#mission-report-instruction').text(string.missions.instructions);
    $('#user-mission-text').val(b);
    $('.student-text-production').text(a);
  });
}

function writeMission(){
  $(".student-text-production").addClass("hidden");
  $(".student-text-production").next().removeClass("hidden", 0);
  $(".btn-save").text(string.buttons.save);
  $("#user-mission-text").attr("placeholder", string.missions.typeHere).focus();
}

function sendMissionText(){
  var studentText = $("#user-mission-text").val();
  var escapedStudentText = escape($("#user-mission-text").val());

  if(studentText.length > 0){
    $.ajax({
      url: "php/save-mission-text.php",
      type: "POST",
      data: {
        userID: Auth.userData.id,
        missionID: Auth.userData.missionId,
        studentText: escapedStudentText,
        studentTextUnescaped: studentText
      }
    }).done(function(res) {
      $(".student-text-production").text(studentText).removeClass("hidden", 0);
      $(".student-text-production").next().addClass("hidden");
    });
  }else{
    $(".student-text-production").removeClass("hidden", 0);
    $(".student-text-production").next().addClass("hidden");
  }
}
*/
