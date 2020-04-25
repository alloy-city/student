function mountChapterNavigation() {
    Student.chapterNavigation = {
        index: 0,
        lessons: [],
        next: () => {
            if (Student.chapterNavigation.index == Student.chapterNavigation.lessons.length - 1) return;
            Student.Content.selectEclassToStudy(++Student.chapterNavigation.index);
        },
        prev: () => {
            if (Student.chapterNavigation.index == 0) return;
            Student.Content.selectEclassToStudy(--Student.chapterNavigation.index);
        }
    }
}

export { mountChapterNavigation }
