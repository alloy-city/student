import { get } from '../http'

const getCourses = new Promise((resolve, reject) => {

    get("course/enlistable", courses => {
        console.log(courses)
        resolve(courses)
    })

})

const getPacks = new Promise((resolve, reject) => {

    get("pack/latest/10", packs => {
        console.log(packs)
        resolve(packs)
    })

})

export { getCourses, getPacks }