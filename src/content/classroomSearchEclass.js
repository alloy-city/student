import { get } from '../http'
import { clearClassRoomEclassDisplay } from './clearClassRoomEclassDisplay'
import { classroomGetLatestEclasses } from './classroomGetLatestEclasses'
import { markUpClassRoomEclassList } from './markUpClassRoomEclassList'

export function classroomSearchEclass() {
    // console.log('classroomSearchEclass')
    clearClassRoomEclassDisplay()
    let search = $("#classroom-eclass-search").val()

    if (search.length > 0) {
        get(`eclass/search/${search}`, lessons => {
            if (lessons.length > 0) {
                markUpClassRoomEclassList(lessons)
            }
        })
    } else classroomGetLatestEclasses()
}