function prepareChapterDescription(description){
    if (description.length > 82){
        let croppedDescription = description.substring(0, 82) + ' [...]'
        return croppedDescription
    } else if (description.length > 0){
        return description
    } else {
        return string.classroom.chapterGenericDescription
    }
}

export { prepareChapterDescription }