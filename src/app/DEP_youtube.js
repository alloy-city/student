//load youtube api
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  // console.log("YouTube API is ready.");
}

var players = {};
var vidPlaying = '';
var vids = [];
var vidsIds = {};

//new stuff

function createVideoPlayer(id) {
  players[id] = new YT.Player('vid-'+id, {
    videoId: id,
    playerVars: {
      controls: 0,
      disablekb: 1,
      cc_load_policy: 0,
      hl: "en",
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    },
    events: {
      'onStateChange': playerStateChanged
    }
  });
}

// function loadVids(){
//   for (var i=0; i<vids.length; i++){
//     console.log('Building player '+i+'...');
//     players[vids[i]] = new YT.Player(vids[i], {
//       height: '600',
//       width: '800',
//       videoId: vids[i],
//       playerVars: {
//         controls: 0,
//         disablekb: 1,
//         cc_load_policy: 0
//       },
//       events: {
//         'onStateChange': playerStateChanged,
//       }
//     });
//   }
// }

function controlVideo(data){
  data = data.resource;
  //console.log('app/youtube.js', 53, data);
  //data[0] => video Id in classElements // data[1] => Video state // data[2] => Current time of the video.

  if(players[data.resource]){
    if(data.playerState == 1){
      if(vidPlaying == ''){
        vidPlaying = data.resource;
        players[data.resource].playVideo().seekTo(data.playerCurrentTime, true);
      }else if (vidPlaying == data.resource){
        players[data.resource].playVideo().seekTo(data.playerCurrentTime, true);
      }else{
        players[data.resource].playVideo().seekTo(data.playerCurrentTime, true);
        vidPlaying = data.resource;
      }
    }else if(data.playerState == 2){
      players[data.resource].pauseVideo();
    }
  }
}

function playerStateChanged(data){
  console.log(Auth.userData.id, data);
  // var dataPackage = [Auth.userData.id, data.data];
  // socket.emit('youtube player state', dataPackage);
}
