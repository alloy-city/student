import { get } from '../http'

const getCourses = new Promise((resolve, reject) => {

    get("course/enlistable", courses => {
        resolve(courses)
    })

})

const getPacks = new Promise((resolve, reject) => {

    get("pack/latest/10", packs => {
        resolve(packs)
    })

})

export { getCourses, getPacks }