import { get } from '../http'
import { clearClassRoomEclassDisplay } from './clearClassRoomEclassDisplay'
import { clearClassRoomEclassList } from './clearClassRoomEclassList'
import { markUpClassRoomEclassList } from './markUpClassRoomEclassList'

export function classroomGetLatestEclasses() {
    // console.log('classroomGetLatestEclasses');

    get(`eclass/my/${Auth.userData._id}`, response => {
        clearClassRoomEclassDisplay();
        clearClassRoomEclassList();
        markUpClassRoomEclassList(response);
    })
}