import { get } from '../http'

const getCourses = new Promise((resolve, reject) => {

    get("course/enlistable", courses => {
        /// #if DEBUG
        // console.log(courses)
        /// #endif
        resolve(courses)
    })

})

const getPacks = new Promise((resolve, reject) => {

    get("pack/latest/10", packs => {
        /// #if DEBUG
        // console.log(packs)
        /// #endif
        resolve(packs)
    })

})

export { getCourses, getPacks }