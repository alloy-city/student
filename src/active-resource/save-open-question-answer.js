import { post } from '../http'

function saveOpenQuestionAnswer(id) {

    let answer = $('#' + id).val();
    let data = {
        user_id: Auth.userData._id,
        question_id: id,
        answer: answer
    }
    
    post(data, "answer/answer", res => {
        notify(string.missions.saved, 'success', false);
    })
}

export { saveOpenQuestionAnswer }