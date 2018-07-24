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
            console.log(res);
            /// #endif

            $(`#${question_id}`).val(res.answer).text(res.answer)

            if (res.messages){
                if (res.messages.length > 0){
                    let instructions = document.createElement("p")
    
                    let alterations = []
    
                    for (let message of res.messages){
                        alterations.push({ index: message.coordinates[0], substr: `<span data-toggle="tooltip" data-placement="top" title="${message.message}" class="bg-danger">`})
                        alterations.push({index: message.coordinates[1], substr: `</span>`})
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
                    let instructionsContainer = document.createElement("div")
                    instructionsContainer.classList.add("well")

                    instructionsContainer.appendChild(instructions)
                    document.getElementById(question_id).parentNode.prepend(instructionsContainer)
                    
                    let instructionsTitle = document.createElement("p")
                    instructionsTitle.innerText = string.missions.instructionsTitle
                    document.getElementById(question_id).parentNode.prepend(instructionsTitle)


                    $('[data-toggle="tooltip"]').tooltip()
                } else if (res.assessed) {
                    let congratulations = document.createElement("p")
                    congratulations.innerHTML = string.missions.congratulations

                    document.getElementById(question_id).parentNode.prepend(congratulations)
                }

                if (res.assessed && res.maxValue && res.value){
                    let percentage = Math.round(res.value / res.maxValue * 100)

                    let bar = htmlToElement(`
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${percentage}%;">
                                ${percentage}%
                            </div>
                        </div>`)

                    document.getElementById(question_id).parentNode.prepend(bar)

                    let xpsEarnedElement = document.createElement("p")
                    xpsEarnedElement.innerHTML = `${string.missions.xps[0]} <span class="text-primary"><b>${res.value} ${res.value > 1 ? string.missions.xps[2] : string.missions.xps[1]}</b></span> ${string.missions.xps[3]}`

                    document.getElementById(question_id).parentNode.prepend(xpsEarnedElement)
                }
            }
        }
    })
}