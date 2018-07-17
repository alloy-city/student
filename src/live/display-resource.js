import { post } from '../http'
import { activateOrderListFunctionality, buildOpenQuestionResource, buildChoiceResource, buildGapsResource, buildOrderResource } from '../active-resource'
import { scrollToElement } from './scroll-to-element'
import { markUpImage, markUpText, markUpVideo, markUpAudio } from '../content/markup-resources'
import {
    audios,
    createAudioPlayer,
    controlAudio,
    audioTimer,
    audioPlaying,
    runBar,
    stopBar,
    playShortAudio
} from '../content/audio'

// import { players, vidPlaying, createVideoPlayer, controlVideo } from '../content/video'
import { createVideoPlayer } from '../content/video'

function displayResource(data) {
    // console.log([43, data]);
    if (Student.Live.resourcesReceived.indexOf(data._id) == -1) {
        Student.Live.resourcesReceived.push(data._id);
        if (data.type == "image") {
            //console.log([38, data.resource]);
            $('#classroom-display-eclass').append('<div class="resource transparent" name="' + data._id + '">' + markUpImage(data.resource) + '</div>');
            $('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function () {
                scrollToElement($('[name="' + data._id + '"]'));
            });
        } else if (data.type == "text") {
            //console.log([46, data]);
            $('#classroom-display-eclass').append('<div class="resource transparent" name="' + data._id + '">' + markUpText(data.resource) + '</div>');
            $('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function () {
                scrollToElement($('[name="' + data._id + '"]'));
            });
        } else if (data.type == "video") {
            //console.log([52, data]);
            $('#classroom-display-eclass').append('<div class="resource transparent" name="' + data._id + '">' + markUpVideo(data.resource) + '</div>');
            createVideoPlayer(data.resource);
            //console.log([55, players]);
            $('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function () {
                scrollToElement($('[name="' + data._id + '"]'));
            });
        } else if (data.type == "audio") {
            $('#classroom-display-eclass').append('<div class="resource transparent" name="' + data._id + '">' + markUpAudio(data) + '</div>');
            createAudioPlayer(data);
            $('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function () {
                scrollToElement($('[name="' + data._id + '"]'));
            });
        } else if (data.type == "html") {
            $('#classroom-display-eclass').append('<div class="resource transparent" name="' + data._id + '">' + data.resource + '</div>');
            $('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function () {
                scrollToElement($('[name="' + data._id + '"]'));
            });
        } else if (data.type == "open") {
            $('#classroom-display-eclass').append('<div class="resource transparent" name="' + data._id + '">' + buildOpenQuestionResource({ _id: data._id, question: data.resource.question }) + '</div>');
            
            post({
                user_id: Auth.userData._id,
                question_id: data._id,
            }, "answer/get-answer", res => {
                if (res){
                    $(`#${data._id}`).val(res.answer).text(res.answer);
                }
            })
            
            $('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function () {
                scrollToElement($('[name="' + data._id + '"]'))
            })

        } if (data.type == "choice") {
            $('#classroom-display-eclass').append('<div class="resource transparent" name="' + data._id + '">' + buildChoiceResource(data.resource, data._id) + '</div>');
            $('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function () {
                scrollToElement($('[name="' + data._id + '"]'));
            });
        } if (data.type == "gaps") {
            $('#classroom-display-eclass').append('<div class="resource transparent" name="' + data._id + '">' + buildGapsResource(data.resource, data._id) + '</div>');
            $('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function () {
                scrollToElement($('[name="' + data._id + '"]'));
            });
        } if (data.type == "order") {
            $('#classroom-display-eclass').append('<div class="resource transparent" name="' + data._id + '">' + buildOrderResource(data) + '</div>');
            $('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function () {
                activateOrderListFunctionality(data._id);
                scrollToElement($('[name="' + data._id + '"]'));
            });
        }
    } else {
        scrollToElement($('[name="' + data._id + '"]'));
    }

    function image() {}
    function text() {}
}

export { displayResource }