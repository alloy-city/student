import { buildChoiceResource } from './build-choice-resource'
import { selectActiveResourceItem } from './select-active-resource-item'
import { verifyActiveChoice } from './verify-active-choice'
import { buildOrderResource } from './build-order-resource'
import { checkOrder } from './check-order'
import { buildGapsResource } from './build-gaps-resource'
import { checkGapFills } from './check-gap-fills'
import { buildOpenQuestionResource } from './build-open-question-resource'
import { saveOpenQuestionAnswer } from './save-open-question-answer'

let resourcesActiveCorrect = {}
let resourcesOrder = {}
let gapsAnswer = {}

export {
    buildChoiceResource,
    selectActiveResourceItem,
    verifyActiveChoice,
    buildOrderResource,
    checkOrder,
    buildGapsResource,
    checkGapFills,
    buildOpenQuestionResource,
    saveOpenQuestionAnswer,
    resourcesActiveCorrect,
    resourcesOrder,
    gapsAnswer
}