import { markUpResourceToStudy } from './markUpResourceToStudy'
import { getOneAnswer } from '../active-resource/getOneAnswer'
import { activateOrderListFunctionality } from '../active-resource/activateOrderListFunctionality'
import { addBackToTopButton } from './addBackToTopButton'
import { addNextLessonButton } from './addNextLessonButton'
import { addPrevLessonButton } from './addPrevLessonButton'
import { addChapterNavigationBar } from './addChapterNavigationBar'

export function formatClassToStudy(EClass) {
    let header = `
    <div>
      <h2>${EClass.title}<small> - ${EClass.subtitle} </small>
      <span class="glyphicon glyphicon-remove pull-right light-gray" aria-hidden="true" onclick="Student.Content.clearClassRoomEclassDisplay()" role="button"></span></h2>
      <p>${EClass.description}</p>
    <div>`

    let resources = '<div id="' + EClass._id + '" class="eclass">'

    for (let i = 0; i < EClass.owns.length; i++) {
        resources += markUpResourceToStudy(EClass.owns[i]);
    }

    resources += '</div>'
    $('#material-display-eclass').append(header + resources)

    if (Student.Content.selectedEclass.openQuestions.length > 0) {
        for (let i = 0; i < Student.Content.selectedEclass.openQuestions.length; i++) {
            getOneAnswer(Student.Content.selectedEclass.openQuestions[i])
        }
    }

    if (Student.Content.selectedEclass.order.length > 0) {
        for (let i = 0; i < Student.Content.selectedEclass.order.length; i++) {
            activateOrderListFunctionality(Student.Content.selectedEclass.order[i]._id)
        }
    }

    // addBackToTopButton()
    // addNextLessonButton()
    // addPrevLessonButton()
    addChapterNavigationBar()
}
