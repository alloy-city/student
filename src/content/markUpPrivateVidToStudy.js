function markUpPrivateVidToStudy(resource) {
    console.log(resource);

    return `<video width="100%" class="private_vid" oncontextmenu="return false;" controls>
        <source src="${resource.resource}" type="video/mp4">
        Your browser does not support HTML video.
    </video>`;
}

module.exports = markUpPrivateVidToStudy;
