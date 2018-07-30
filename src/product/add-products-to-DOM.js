import { nOfColumns, nOfCardsByColumn, nOfCardsOnLastColumn } from './cards-by-column'
import formatProductCard from './assess-product'

let coursesContainer = document.getElementById("courses-content")

export default (products) => {
    // console.log(products)

    /*====LOOPS====*/
    let nCourses = products.length
    let nCol = nOfColumns(nCourses)
    let ncc = nOfCardsByColumn(nCourses)
    let nclc = nOfCardsOnLastColumn(nCourses)

    // console.log(nCourses)
    // console.log(nCol)
    // console.log(ncc)
    // console.log(nclc)

    let cardsMarkup = "<div>"

    for (let i = 0; i < nCol; i++) {

        // console.log(`|||| Column ${i} ||||`)
        cardsMarkup += `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 masonry-column">`

        let c = nclc
        if (i < nCol - 1) c = ncc

        let cardsCounter = i
        // console.log("c:", c)
        for (let ii = 0; ii < c; ii++) {
            // console.log(ii)
            // console.log(cardsCounter, products.length)

            if (cardsCounter < products.length) {
                // console.log(`===> Product ${cardsCounter}: ${products[cardsCounter].title}`)
                cardsMarkup += formatProductCard(products[cardsCounter])
            }

            if (c == nclc && ii >= ncc - 1) {
                cardsCounter++
            } else {
                cardsCounter += nCol
            }
        }

        cardsMarkup += "</div>"
    }

    // console.log(cardsMarkup)

    cardsMarkup += "</div>"
    coursesContainer.appendChild(htmlToElement(cardsMarkup))
}