import { showNavigation } from './navigation'

export function clearClassRoomEclassDisplay() {
    document.getElementById("material-display-eclass").innerHTML = ""
    document.getElementById("material-display-history").innerHTML = ""
    Student.Content.selectedEclass.order = []
    Student.Content.selectedEclass.openQuestions = []
    showNavigation()
}