let audios = {}

function createAudioPlayer(audio) {
    /// #if DEBUG
    // console.log(audio)
    /// #endif

    let oneAudio = document.createElement("AUDIO")
    oneAudio.src = 'media/' + audio.resource
    oneAudio.name = audio._id
    oneAudio.onplay = runBar
    oneAudio.onpause = stopBar
    audios[audio._id] = oneAudio
}

function controlAudio(a) {
    /// #if DEBUG
    // console.log(a)
    /// #endif
    
    if (a.resource.playerState == "playing") {
        audios[a.resource.resource].currentTime = a.resource.playerCurrentTime;
        audios[a.resource.resource].play();
    } else {
        /// #if DEBUG
        // console.log(a.resource.playerState);
        /// #endif
        audios[a.resource.resource].pause();
    }
}

let audioTimer
let audioPlaying
function runBar(a) {
    audioPlaying = a.target.name;
    /// #if DEBUG
    // console.log(a);
    /// #endif

    // audios[a.target.name].updater = setInterval(updateBar(a.target.name, (a.target.currentTime / a.target.duration)), 250);
    // audios[a.target.name].updater = setInterval(updateBar(a.target.name), 250);
    audioTimer = setInterval(updateBar, 500);
    
    $('#' + audioPlaying).addClass('active');
    
    function updateBar() {
        var progression = Math.floor(audios[audioPlaying].currentTime / audios[audioPlaying].duration * 100);
        /// #if DEBUG
        // console.log(progression + '%');
        /// #endif
        
        $('#' + audioPlaying).css('width', (progression + '%')).attr('aria-valuenow', progression);
    }
    
}

function stopBar(a) {
    clearInterval(audioTimer);
    $('#' + audioPlaying).removeClass('active');
}

function playShortAudio(element) {
    // console.log(57, element);
    
    var url = $(element).attr('name');
    // console.log(60, url);
    if (url.length > 0) {
        var audio = new Audio();
        audio.src = url;
        audio.addEventListener('loadedmetadata', function () {
            // console.log("Playing " + audio.src + ", for: " + audio.duration + "seconds.");
            audio.play();
            
            var audioIcon = $('<span class="glyphicon glyphicon-volume-up" aria-hidden="true" style="color: cadetblue;font-size: large;left: 2px;top: 3px;"></span>');
            $(element).append(audioIcon);
            var delay = audio.duration * 1000;
            /// #if DEBUG
            // console.log(delay);
            /// #endif

            setTimeout(function () {
                audioIcon.remove();
            }, (delay));
        });
    }

}

window.playShortAudio = playShortAudio

export {
    audios,
    createAudioPlayer,
    controlAudio,
    audioTimer,
    audioPlaying,
    runBar,
    stopBar,
    playShortAudio
}