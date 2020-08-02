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
import { faq } from './faqs'
import * as search from './search'
import { addSwitchToUI } from './chapterDisplayModeSwitch'
import { showLevels } from './showLevels'

addSwitchToUI();

let theme

let selectedEclass = {
    openQuestions: [],
    order: []
}

function setTheme(t){
    theme = t
}

faq();

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
    showLevels,
    showChapters,
    openChapter,
    search
}
