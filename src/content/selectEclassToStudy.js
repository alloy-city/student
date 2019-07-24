import { get } from '../http'
import { clearClassRoomEclassDisplay } from './clearClassRoomEclassDisplay'
import { formatClassToStudy } from './formatClassToStudy'
import { hideNavigation } from './navigation'

export function selectEclassToStudy(_id) {
    get(`eclass/student/${_id}`, lesson => {
        clearClassRoomEclassDisplay()
        hideNavigation()
        formatClassToStudy(lesson)
        document.getElementById("material-display-eclass").scrollIntoView()
    })
}
