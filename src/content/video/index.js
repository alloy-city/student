let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = () => {
    // console.log("YouTube API is ready.");
}

let players = {}
let vidPlaying = ''
// let vids = []
// let vidsIds = {}

function createVideoPlayer(id) {
    players[id] = new YT.Player('vid-' + id, {
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
    })
}

function controlVideo(data) {
    data = data.resource
    // console.log(data)
    //data[0] => video Id in classElements // data[1] => Video state // data[2] => Current time of the video.

    if (players[data.resource]) {

        /* data.playerState

            -1 – unstarted
            0 – ended
            1 – playing
            2 – paused
            3 – buffering
            5 – video cued
        */

        if (data.playerState == 1) {

            // console.log(data.playerState)

            if (vidPlaying == '') {

                // console.log(data.resource)

                vidPlaying = data.resource;
                players[data.resource].playVideo().seekTo(data.playerCurrentTime, true);
            } else if (vidPlaying == data.resource) {

                // console.log(data.playerCurrentTime)

                players[data.resource].playVideo().seekTo(data.playerCurrentTime, true);
            } else {

                // console.log(data.playerCurrentTime)

                players[data.resource].playVideo().seekTo(data.playerCurrentTime, true);
                vidPlaying = data.resource;
            }
        } else if (data.playerState == 2) {
            players[data.resource].pauseVideo();
        }
    }
}

function playerStateChanged(data) {
    // console.log(Auth.userData._id, data);
}

// export { players, vidPlaying, createVideoPlayer, controlVideo }
export { createVideoPlayer, controlVideo }
