import {
    markUpText,
    markUpImage,
    markUpAudioToStudy,
    markUpVideoToStudy
} from './markup-resources'

import { buildOpenQuestionResource, buildChoiceResource, buildOrderResource, buildGapsResource } from '../active-resource'

export function markUpResourceToStudy(oneResource) {
    //console.log('app/missions-new-system.js:96', oneResource);

    let header = [
        '<div class="resource" name="' + oneResource._id + '">'
    ]

    let markUp = header.join('');
    // var items = ''
    if (oneResource.type == "html") markUp = markUp + oneResource.resource;
    else if (oneResource.type == "text") markUp = markUp + markUpText(oneResource.resource);
    else if (oneResource.type == "image") markUp = markUp + markUpImage(oneResource.resource);
    else if (oneResource.type == "audio") markUp = markUp + markUpAudioToStudy(oneResource);
    else if (oneResource.type == "video") markUp = markUp + markUpVideoToStudy(oneResource);
    else if (oneResource.type == "open") {
        Student.Content.selectedEclass.openQuestions.push(oneResource._id);
        markUp = markUp + buildOpenQuestionResource({ _id: oneResource._id, question: oneResource.resource.question });
    }
    else if (oneResource.type == "choice") markUp = markUp + buildChoiceResource(oneResource.resource, oneResource._id);
    else if (oneResource.type == "order") markUp = markUp + buildOrderResource(oneResource);
    else if (oneResource.type == "gaps") markUp = markUp + buildGapsResource(oneResource.resource, oneResource._id);
    // return markUp+studentMarkUp;

    markUp = markUp + "</div>";

    return markUp;
}