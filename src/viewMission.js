import { get, post } from './http'
import { clearClassRoomEclassDisplay, formatClassToStudy } from './content'
import { hideNavigation } from './content/navigation'
import { mountChapterNavigation } from './content/mountChapterNavigation';

function viewMission(lessonId, questionId, messageId){
    get(`eclass/chapter_id_from_lesson_id/${lessonId}`, chapter_id => {
        get(`chapter/${chapter_id}`, chapter => {
            if (!Student.chapterNavigation) mountChapterNavigation();

            for(let i=0; i<chapter.lessons.length; i++) {
                Student.chapterNavigation.lessons[i] = chapter.lessons[i]._id;

                if (chapter.lessons[i]._id == lessonId) {
                    Student.chapterNavigation.index = i;
                }
            }

            get(`eclass/student/${lessonId}`, lesson => {
                let messageAcknowledgement = {
                    timestamp: new Date(),
                    message_id: messageId
                }
        
                post(messageAcknowledgement, "message/consume", res => {
                    if (res.message == "Message acknowledged.") {
                        let messageElement = document.getElementById(messageId)
                        if (messageElement){
                            if (messageElement.parentNode.childElementCount == 2) messageElement.parentNode.remove();
                            else messageElement.remove();
                        }
                    }
                })

                clearClassRoomEclassDisplay()
                hideNavigation()
                formatClassToStudy(lesson)
                let question = document.querySelector(`div.resource[name="${questionId}"]`)
                
                if (question) {
                    question.scrollIntoView()
                }
            })
        })
    });
}

function consumeOneMessage(ids, i, limit, callback) {
    if (i == limit) {
        callback();
        return;
    }

    let messageAcknowledgement = {
        timestamp: new Date(),
        message_id: ids[i]
    }

    post(messageAcknowledgement, "message/consume", res => {
        consumeOneMessage(ids, i+1, limit, callback);
    });
}

function consumeAll(messageIds, callback) {
    consumeOneMessage(messageIds, 0, messageIds.length, callback);
}

export { viewMission, consumeAll }
