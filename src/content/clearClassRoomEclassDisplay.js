import { showNavigation } from './navigation'

export function clearClassRoomEclassDisplay() {
    document.getElementById("material-display-eclass").innerHTML = ""
    Student.Content.selectedEclass.order = []
    Student.Content.selectedEclass.openQuestions = []
    showNavigation()
}