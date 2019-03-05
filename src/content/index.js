import { classroomSearchEclass } from './classroomSearchEclass'
import { classroomGetLatestEclasses } from './classroomGetLatestEclasses'
import { clearClassRoomEclassDisplay } from './clearClassRoomEclassDisplay'
import { clearClassRoomEclassList } from './clearClassRoomEclassList'
import { markUpClassRoomEclassList } from './markUpClassRoomEclassList'
import { selectEclassToStudy } from './selectEclassToStudy'
import { formatClassToStudy } from './formatClassToStudy'
import { markUpResourceToStudy } from './markUpResourceToStudy'
import { showThemes } from './showThemes'
import { showChapters } from './showChapters'
import { openChapter } from './openChapter'

let theme

let selectedEclass = {
    openQuestions: [],
    order: []
}

function setTheme(t){
    theme = t
}

export {
    theme,
    setTheme,
    selectedEclass,
    classroomSearchEclass,
    classroomGetLatestEclasses,
    clearClassRoomEclassDisplay,
    clearClassRoomEclassList,
    markUpClassRoomEclassList,
    selectEclassToStudy,
    formatClassToStudy,
    markUpResourceToStudy,
    showThemes,
    showChapters,
    openChapter
}
