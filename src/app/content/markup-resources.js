function markUpText(resource) {
    var markUp = '<p>' + resource + '</p>';
    return markUp;
}

function markUpImage(resource) {
    var markUp = '<img src="/images/slides/' + resource + '" class="img-responsive" alt="' + resource + '">'
    return markUp;
}

function markUpAudio(resource) {
    var markUp = [
        '<div class="progress">',
        '<div id="' + resource._id + '" class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0;">',
        '</div>',
        '</div>'
    ].join('');
    return markUp;
}

function markUpAudioToStudy(resource) {
    var markUp = `
    <audio controls style="width: 100%;">
      <source src="media/${resource.resource}" type="audio/mp3">
    </audio>
    `
    return markUp;
}

function markUpVideo(resource) {
    var markUp = '<div class="embed-responsive embed-responsive-16by9"><div id="vid-' + resource + '"></div></div>'
    return markUp;
}

function markUpVideoToStudy(resource) {
    var markUp = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + resource.resource + '"></iframe></div>'
    return markUp;
}

export {
    markUpText,
    markUpImage,
    markUpAudio,
    markUpAudioToStudy,
    markUpVideo,
    markUpVideoToStudy
}