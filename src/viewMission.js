import { get, post } from './http'
import { clearClassRoomEclassDisplay, formatClassToStudy } from './content'
import { hideNavigation } from './content/navigation'

function viewMission(lessonId, questionId, messageId){
    console.log(lessonId, questionId)

    get(`eclass/student/${lessonId}`, lesson => {
        clearClassRoomEclassDisplay()
        hideNavigation()
        formatClassToStudy(lesson)
        let question = document.querySelector(`div.resource[name="${questionId}"]`)
        
        if (question) {
            question.scrollIntoView()
        }

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
    })
}

export { viewMission }