import { get } from '../http'
import { clearClassRoomEclassDisplay } from './clearClassRoomEclassDisplay'
import { formatClassToStudy } from './formatClassToStudy'
import { hideNavigation } from './navigation'

export function selectEclassToStudy(index) {
    Student.chapterNavigation.index = index;
    get(`eclass/student/${Student.chapterNavigation.lessons[index]}`, lesson => {
        clearClassRoomEclassDisplay()
        hideNavigation()
        formatClassToStudy(lesson)
        document.getElementById("material-display-eclass").scrollIntoView()
    })
}
