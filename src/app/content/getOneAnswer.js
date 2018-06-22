import { post } from '../http'

export function getOneAnswer(question_id) {
    // console.log("missions-new-system:139 ", question_id);

    let body = {
        user_id: Auth.userData._id,
        question_id: question_id,
    }

    post(body, "answer/get-answer", res => {
        if (res) $(`#${question_id}`).val(res.answer).text(res.answer);
    })
}