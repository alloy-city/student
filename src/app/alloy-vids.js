export function setVideo(id) {
    $("#theater").attr('src', '//www.youtube.com/embed/' + id);
}

export function setPlaylist() {
    var playList = '';
    var playLists = ['PLlsgGip2wVhGy0zAbAwL8DKserATZjemU', 'PLlsgGip2wVhFsukxPoB1jmz8gx9xjCYFi'];

    if (Auth.userData.xp < 1000) {
        playList = playLists[0];
    } else {
        playList = playLists[1]
    }

    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playList + "&fields=items(snippet(title)%2Csnippet(thumbnails(default(url)))%2Csnippet(position)%2Csnippet(resourceId(videoId)))&key=" + googleAPIkey,
        type: "GET",
        async: false,
        dataType: 'jsonp',
        cache: true,
        success: function (data, status, error) {
            if (error) // console.log(error)
            if (status) // console.log(status)
            if (data){
                // console.log('success', data);
                for (var i = 0; i < data.items.length; i++) {
                    $("#vidsMenu").append("<div onclick='AlloyVids.setVideo(this.id)' id='" + data.items[i].snippet.resourceId.videoId + "' ><div class='cropImgVidsMenu'><img src='" + data.items[i].snippet.thumbnails.default.url + "'></div><p>" + data.items[i].snippet.title.slice(18) + "</p></div>");
                }
            } else {
                console.log("Couldn't get YouTube playlist.", playList)
            }
        },
        error: function (data, status, error) {
            console.log('error', data, status, error);
        }
    });
}
