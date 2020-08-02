import { themeSmallIcons } from '../theme-icons'
import buildChaptersTree from './build-chapters-tree'
import calendar from './calendar'
import agreements from './agreements'
import { orderByTitle } from './orderByTitle'
import { setCourses } from './index';

export default (product) => {
    /// #if DEBUG
    // console.log(product)
    /// #endif

    let levelBlock = `<div class="btn-group btn-group-justified" role="group" aria-label="levels">`
    for (let i=0; i < (string.material.levels.length - 1); i++){
        let type = "default"
        if (i == product.level) type = "info"
        levelBlock += `
            <div class="btn-group" role="group">
                <a type="button" class="btn btn-${type} btn-xs disabled" role="button">${string.material.levels[i].name}</a>
            </div>`
    }
    levelBlock += "</div>"

    let CEFRL = `
        <div class="progress">
            <div class="progress-bar CEFRL CEFRL-A1" style="width: 25%">
                A1
            </div>
            <div class="progress-bar CEFRL CEFRL-A2" style="width: 20%">
                A2
            </div>
            <div class="progress-bar CEFRL CEFRL-B1" style="width: 20%">
                B1
            </div>
            <div class="progress-bar CEFRL-B2" style="width: 22.5%">
                B2
            </div>
            <div class="progress-bar CEFRL-C1" style="width: 12.5%">
                C1
            </div>
        </div>`

    let hTitle
    if (product.chapters){
        if (product.chapters.length == 1) {
            hTitle = string.productDetail.chapter
        } else {
            hTitle = string.productDetail.chapters
        }
    } else if (product.lessons) {
        hTitle = string.productDetail.lessons
    } else {
        hTitle = ""
    }

    let priceString;
    if (product.price >= Auth.minimumInstalmentPrice) {
        priceString = `${Auth.maxInstalments}x ${numberToBRL(product.price/Auth.maxInstalments)} <small><i>${string.commons.or} ${numberToBRL(product.price*Auth.fullPaymentFraction)}</i></small>`
    } else {
        priceString = numberToBRL(product.price);
    }

    let markup = `
        <div id="product-detail" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="pull-left text-muted small"><i>${string.productDetail.product} ${product._id}</i></p>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </br>
                        <h1 class="text-center clear">${product.title}</h1>
                        <p>${product.description}</p>
                    </div>
                    <div class="modal-body">
                        <div>
                            ${ product.theme ?
                                `<h2>${string.productDetail.aboutTheTheme}</h2>
                                <img src="/images/theme-icons/${themeSmallIcons[product.theme]}.png" alt="${themeSmallIcons[product.theme]}">
                                <h3>${string.material.themes[product.theme].title}</h3>
                                <p>${string.material.themes[product.theme].description}</p>`
                            : "" }
                        </div>
                        </br>

                        <h2>${string.level}</h2>
                        ${levelBlock}
                        ${CEFRL}

                        <h2>${hTitle}</h2>
                        <div id="material-tree"></div>
                        
                        <h2>${product.hangouts ? string.productDetail.hangouts : ""}</h2>
                        <div id="hangouts-calendar"></div>
                        <div id="hangouts-list"></div>
                        <div id="agreements"></div>
                        <div class="product-detail-buy-container">
                            <h3>${priceString}</h3>
                            <a class="btn btn-primary" role="button" onclick="Student.Product.addToShoppingCart('${product._id}', ${product.price}, '${product.title}')">${string.productDetail.addToShoppingCart}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    document.body.insertBefore(htmlToElement(markup), document.getElementsByClassName("content")[0])
    
    if (product.chapters){
        $("#material-tree").treeview({
            data: buildChaptersTree(product.chapters),
            levels: 0,
            collapseIcon: "glyphicon glyphicon-chevron-down",
            expandIcon: "glyphicon glyphicon-chevron-right"
        });
    }

    let hangouts = []
    if (product.courses){
        setCourses(product.courses);
        for (let i=0; i < product.courses.length; i++){
            for (let ii=0; ii<product.courses[i].hangouts.length; ii++){
                hangouts.push(product.courses[i].hangouts[ii]);
            }
        }
        calendar(hangouts);
    } else if (product.hangouts) {
        setCourses([product]);
        for (let i = 0; i < product.hangouts.length; i++) {
            hangouts.push(product.hangouts[i]);
        }
        calendar(hangouts);
    } else if (product.lessons) {
        orderByTitle(product.lessons)
        /// #if DEBUG
        // console.log(product.lessons)
        /// #endif
        let lessonsMarkup = `<ul class="list-group">`
        for (let lesson of product.lessons){
            lessonsMarkup += `<li class="list-group-item"><span class="text-success">${lesson.title}</span> <small>${lesson.subtitle}</small>${lesson.description ? `<p>${lesson.description}</p>` : ""}</li>`
        }
        $("#material-tree").html(lessonsMarkup)
    }

    agreements(document.getElementById("agreements"))

    $("#product-detail").modal().on('hidden.bs.modal', e => {
        e.currentTarget.remove()
    })
}
