import { post } from '../http';
import { mountChapterNavigation } from './mountChapterNavigation';
import { displayLessonList } from './displayLessonList';

function openChapter(themeIndex, _id, ownsAll) {
    mountChapterNavigation();

    for (let [i, chapter] of Auth.chapters[themeIndex].entries()){
        if (chapter._id == _id){
            post({ ids: chapter.lessons }, `eclass/s`, lessons => {
                displayLessonList(chapter, lessons, ownsAll, { organizedByLevel: false, theme: themeIndex });
            });

            break;
        }
    }
}

function compare(a, b) {
    if (a.title < b.title)
        return -1;
    if (a.title > b.title)
        return 1;
    return 0;
}

export { openChapter }
