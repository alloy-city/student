import { post } from '../http'

export function getOneAnswer(question_id) {
    /// #if DEBUG
    // console.log(question_id);
    /// #endif
    
    let body = {
        user_id: Auth.userData._id,
        question_id: question_id,
    }

    post(body, "answer/get-answer", res => {
        if (res) {
            /// #if DEBUG
            // console.log(res);
            /// #endif

            $(`#${question_id}`).val(res.answer).text(res.answer)

            if (res.messages && res.messages.length > 0){
                let instructions = document.createElement("p")

                let alterations = []

                for (let message of res.messages){
                    alterations.push({ index: message.coordinates[0], substr: `<mark data-toggle="tooltip" data-placement="top" title="${message.message}">`})
                    alterations.push({index: message.coordinates[1], substr: `</mark>`})
                }

                alterations.sort((a, b) => {
                    return a.index - b.index
                })

                let str = ""
                let i = 0
                let j = 0

                while ( i < res.answer.length ) {
                    if (alterations[j] && i == alterations[j].index) {
                        str += alterations[j].substr
                        j++
                    } else {
                        str += res.answer[i]
                        i++
                    }
                }

                instructions.innerHTML = str
                document.getElementById(question_id).parentNode.prepend(instructions)

                $('[data-toggle="tooltip"]').tooltip()
            }
        }
    })
}