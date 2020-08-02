import { post } from '../http';
import { mountChapterNavigation } from './mountChapterNavigation';
import { displayLessonList } from "./displayLessonList";

function openThisChapter(chapter, ownsAll, levelToGoBackTo) {
    mountChapterNavigation();

    post({ ids: chapter.lessons }, `eclass/s`, lessons => {
        displayLessonList(chapter, lessons, ownsAll, { organizedByLevel: true, level: levelToGoBackTo });
    });
}

export { openThisChapter }
