import { showNavigation } from './navigation'

export function clearClassRoomEclassDisplay() {
    let lessonProgressBar = document.getElementById("lesson-progress-bar-container");
    if (lessonProgressBar) lessonProgressBar.remove();
    document.getElementById("material-display-eclass").innerHTML = ""
    document.getElementById("material-display-history").innerHTML = ""
    Student.Content.selectedEclass.order = []
    Student.Content.selectedEclass.openQuestions = []
    showNavigation()
}
