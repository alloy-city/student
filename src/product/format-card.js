import { themeSmallIcons } from '../theme-icons'

export default (title, isPack, description, level, theme, firstTwoHangouts, teachers, totalMinutes, price, _id) => {

    let teachersElement, startDate, twoFirstDays, day, hour, priceString

    let typeIcons = `<span class="text-muted glyphicon glyphicon-facetime-video" aria-hidden="true"></span>`
    if (isPack) {
        typeIcons += ` <span class="text-muted glyphicon glyphicon-book" aria-hidden="true"></span>`
    }

    if (teachers.length == 1) {
        teachersElement = `<p><span class="text-muted glyphicon glyphicon-education" aria-hidden="true"></span> <span class="text-muted">${string.products.teacher}</span> <span class="badge">${teachers[0]}</span></p>`
    } else {
        teachersElement = `<p><span class="text-muted glyphicon glyphicon-education" aria-hidden="true"></span> <span class="text-muted">${string.products.teachers}</span> `
        for (let ii = 0; ii < teachers.length; ii++) {
            teachersElement += `<span class="badge">${teachers[ii]}</span> `
        }
        teachersElement += `</p>`
    }

    if (description.length > 150) {
        description = `<p>${description.slice(0, 150)}</p><div class="text-continues"></div>`
    } else {
        description = `<p>${description}</p>`
    }

    if (firstTwoHangouts && firstTwoHangouts.length >= 2){
        startDate = moment(firstTwoHangouts[0]).format('DD/MM/YYYY - dddd')
        twoFirstDays = [moment(firstTwoHangouts[0]).format('ddd'), moment(firstTwoHangouts[1]).format('ddd')]
    
        if (firstTwoHangouts.length == 1 || twoFirstDays[0] == twoFirstDays[1]) {
            day = moment(firstTwoHangouts[0]).format('dddd')
        } else {
            day = moment(firstTwoHangouts[0]).format('ddd') + '/' + moment(firstTwoHangouts[1]).format('ddd')
        }
    
        hour = moment(firstTwoHangouts[0]).format('HH:mm');
    }

    if (price >= Auth.minimumInstalmentPrice) {
        priceString = `${Auth.maxInstalments}x ${numberToBRL(price/Auth.maxInstalments)}`
    } else {
        priceString = numberToBRL(price);
    }

    let card = `
        <div class="thumbnail product-card">
            <div class="caption">
                <div class="pull-right">
                    ${typeIcons}
                </div>
                <div>
                    <h3 class="text-center">
                        ${title}
                    </h3>
                    <span class="label label-primary">${string.material.levels[level]}</span>
                    <span class="label label-success">${string.material.themes[theme].adjective}</span>
                    ${day ? `<span class="label label-info">${day}</span>` : ""}
                    ${hour ? `<span class="label label-info">${hour}</span>` : ""}
                </div>

                <div>
                    <div>
                        <img src="/images/theme-icons/${themeSmallIcons[theme]}.png" alt="${themeSmallIcons[theme]}">
                    </div>
                    <div class="product-description">
                        ${description}
                    </div>
                    <div class="product-card-info">
                        ${teachersElement}
                        <p><span class="text-muted glyphicon glyphicon-time" aria-hidden="true"></span> <span class="text-muted">${string.products.workload}</span> <span class="badge">${moment.duration(totalMinutes, "minutes").format("h:mm")}</span></p>
                        ${startDate ? `<p><span class="text-muted glyphicon glyphicon-calendar" aria-hidden="true"></span> <span class="text-muted">${string.products.begins}</span> <span class="badge">${startDate}</span></p>` : ""}
                    </div>
                </div>

                <div>
                    <h3 class="text-primary pull-left">${priceString}</h3>
                    <a class="btn btn-primary pull-right" role="button" onclick="Student.Product.view('${_id}')">${string.commons.open}</a>
                    </br>
                </div>
            </div>
        </div>`

    return card
}