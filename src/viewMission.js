import { get, post } from './http'
import { clearClassRoomEclassDisplay, formatClassToStudy } from './content'
import { hideNavigation } from './content/navigation'
import { mountChapterNavigation } from './content/mountChapterNavigation';

function viewMission(lessonId, questionId, messageId){
    console.log(lessonId, questionId)

    get(`eclass/chapter_id_from_lesson_id/${lessonId}`, chapter_id => {
        get(`chapter/${chapter_id}`, chapter => {
            console.log(chapter)
            
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
                    console.log(res)
                    if (res.message == "Message acknowledged.") {
                        let messageElement = document.getElementById(messageId)
                        if (messageElement){
                            messageElement.remove()
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

export { viewMission }
