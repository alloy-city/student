import { getPacks, getCourses } from './get-products'
import addProductsToDOM from './add-products-to-DOM'
import { view } from './view'
import close from './close.js'
import { createCalendar } from './calendar/create-calendar'
import addToShoppingCart from './add-to-shopping-cart'

function userIsInGroup(usersInGroup, user) {
    for (var i = 0; i < usersInGroup.length; i++) {
        if (userInGroup[i] == user) {
            return true;
        }
    }
    return false;
}

let products = [];
function getRecent() {
    getPacks.then((packs) => {
        products = packs;
        getCourses.then((courses) => {
            if (courses != 1){ // If server returns 1, no courses are available. Proceed with packs only.
                for (let i = 0; i < courses.length; i++){
                    products.push(courses[i])
                }
            }

            addProductsToDOM(products)

            if (products.length > 0){
                Student.Evidence.show(`${string.products.newCoursesAvailable} <a class="alert-link" role="button" data-dismiss="alert" onclick="Student.ActiveTab.setTab('products')">${string.products.checkItOut}</a>`)
            }
        })
    })
}

let coursesContainer = document.getElementById("courses-content")

window.onresize = addProductsToDOM

export {
    userIsInGroup,
    getRecent,
    view,
    close,
    createCalendar,
    addToShoppingCart
}
