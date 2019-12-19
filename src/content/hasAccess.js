function hasAccess(_id) {
    /// #if DEBUG
    // console.log(Auth.userData.hasAccessTo)
    /// #endif

    for (let lesson of Auth.userData.hasAccessTo) {
        if (lesson.eclass == _id || lesson._id == _id)
            return true
    }

    return false
}

function hasAccessLessons(lessons){
    /// #if DEBUG
    // console.log(lessons)
    /// #endif

    for (let lesson of lessons){
        if (!hasAccess(lesson)) return false
    }

    return true
}

export { hasAccess, hasAccessLessons }
