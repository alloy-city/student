import { nOfColumns, nOfCardsByColumn, nOfCardsOnLastColumn } from './cards-by-column'
import formatProductCard from './assess-product'

let coursesContainer = document.getElementById("courses-content")

export default (products) => {
    let nCourses = products.length
    let nCol = nOfColumns()
    let ncc = nOfCardsByColumn(nCourses)
    let nclc = nOfCardsOnLastColumn(nCourses)

    let cardsMarkup = "<div>"

    for (let i = 0; i < nCol; i++) {

        cardsMarkup += `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 masonry-column">`

        let c = nclc
        if (i < nCol - 1) c = ncc

        let cardsCounter = i
        for (let ii = 0; ii < c; ii++) {

            if (cardsCounter < products.length) {
                cardsMarkup += formatProductCard(products[cardsCounter])
            }

            if (c == nclc && ii >= ncc - 1) {
                cardsCounter++;
            } else {
                cardsCounter += nCol
                if (cardsCounter >= products.length) cardsCounter -= ncc;
            }
        }

        cardsMarkup += "</div>"
    }

    cardsMarkup += "</div>"
    coursesContainer.appendChild(htmlToElement(cardsMarkup))
}
