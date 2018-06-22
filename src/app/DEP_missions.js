var nSlides
var maxItems = 6;
var dotsBoolean = true;

function getMissions(){
  var parser, xmlDoc, xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         parser = new DOMParser();
         xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");

         var missions = xmlDoc.getElementsByTagName("id");
         var missionNames = {};

         for (var ii = 0; ii<missions.length; ii++){
           missionNames[missions[ii].innerHTML] = missions[ii].nextElementSibling.innerHTML;
         }

         $.get("../php/get_missions.php", function(data) {
           data = JSON.parse(data);

           var top = "<table id='mission-table'><tr><th>"+string.missions.mission+"</th><th>"+string.missions.status+"</th></tr>"
           var bottom = "</table>"
           var body = ""
           var isAccomplished = ""

           for(var i = 0; i<data.length; i++){
             if(data[i][1] == 0){
               isAccomplished = string.missions.given;
             }else{
               isAccomplished = string.missions.accomplished;
             }

             body += '<tr onclick="displayMission('+data[i][0]+')"><td>'+missionNames[data[i][0]]+'</td><td>'+isAccomplished+'</td></tr>';
           }

           var markUp = top+body+bottom;

           $('#missions-list').html(markUp);
         });
      }
  };
  xhttp.open("GET", "missions/mission-names.xml", true);
  xhttp.send();
}

function displayMission(missionId){
  cleanMission();
  getUserText(missionId);

  $.get('../missions/'+missionId+'.html', function(data){
    $('#missionContent').html(data);

    nSlides = $('.studentSlidesNav').children('div').length;
    if(nSlides < maxItems) {
        maxItems = nSlides;
        dotsBoolean = false;
    }else{
      dotsBoolean = true;
      maxItems = 6;
    }

    $('.studentSlideDisplay').slick({
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.studentSlidesNav'
    });
    $('.studentSlidesNav').slick({
      infinite: false,
      slidesToShow: maxItems,
      slidesToScroll: 1,
      asNavFor: '.studentSlideDisplay',
      dots: dotsBoolean,
      centerMode: false,
      focusOnSelect: true
    });
  });
}

function cleanMission(){
  $('#missionContent').html('');
  $('#missionAnswer').html('');
}

function bookmark(){
  if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
      window.sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
      window.external.AddFavorite(location.href, document.title);
    } else if (window.opera && window.print) { // Opera Hotlist
      this.title = document.title;
      return true;
    } else { // webkit - safari/chrome
      alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D'+desktopstring.bookmark);
    }
}
