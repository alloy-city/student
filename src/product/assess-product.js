import format from './format-card'

export default (product) => {
    console.log(product)

    let teachers = []
    let totalMinutes = 0
    let isPack = false
    let firstTwoHangouts

    // if product.hangouts -> it's a course. If not, it's a pack
    if (product.hangouts) {
        firstTwoHangouts = [product.hangouts[0], product.hangouts[1]]

        for (let i = 0; i < product.teachers.length; i++) {
            teachers.push(product.teachers[i].nickname)
        }

        for (let i = 0; i < product.hangouts.length; i++) {
            totalMinutes += 50
        }

    } else {

        isPack = true
        if (product.courses && product.courses[0] && product.courses[0].hangouts.length >= 2){
            firstTwoHangouts = [product.courses[0].hangouts[0], product.courses[0].hangouts[1]]
        }

        for (let i = 0; i < product.courses.length; i++) {
            for (let ii = 0; ii < product.courses[i].teachers.length; ii++) {
                teachers.push(product.courses[i].teachers[ii].nickname)
            }
        }

        for (let i = 0; i < product.courses.length; i++) {
            for (let ii = 0; ii < product.courses[i].hangouts.length; ii++) {
                totalMinutes += 50
            }
        }

    }

    return format(product.title, isPack, product.description, product.level, product.theme, firstTwoHangouts, teachers, totalMinutes, product.price, product._id)
}