import { hasAccess, hasAccessLessons } from "./hasAccess"
import { prepareChapterDescription } from './prepareChapterDescription'

function showChapters(themeId) {
    /// #if DEBUG
    // console.log(themeId)
    // console.log(Auth.chapters[themeId])
    /// #endif

    document.getElementById("material-display-history").innerHTML = ""
    Student.Content.setTheme(themeId)

    $("#classroom-content-navigation-title").html(string.material.themes[themeId].title)
    $("#classroom-content-navigation-description").html(string.material.themes[themeId].description)

    let chaptersMarkup = `
        <button type="button" class="btn btn-primary" onclick="Student.Content.showThemes()">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            ${string.buttons.goBack}
        </button>
        <div class="row">`

    for (let i = 0; i < Auth.chapters[themeId].length; i++) {

        // define if user has access to this chapter
        // call markup function accordingly
        if (hasAccess(Auth.chapters[themeId][i]._id) || Auth.chapters[themeId][i].price == 0 || hasAccessLessons(Auth.chapters[themeId][i].lessons)){
            chaptersMarkup += `
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="thumbnail chapter-card">
                        <img src="/images/chapter-icons/${Auth.chapters[themeId][i].icon ? Auth.chapters[themeId][i].icon : "chapter-no-icon.png"}" alt="">
                        <h4>${Auth.chapters[themeId][i].title}</h4>
                        <p>${prepareChapterDescription(Auth.chapters[themeId][i].description)}</p>
                        <h3><br></h3>
                        <button class="btn btn-default btn-sm pull-right" type="button" onclick="Student.Content.openChapter(${themeId}, '${Auth.chapters[themeId][i]._id}', true)">${string.commons.open}</button>
                    </div>
                </div>`
        } else {
            chaptersMarkup += `
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="thumbnail chapter-card">
                        <img src="/images/chapter-icons/${Auth.chapters[themeId][i].icon ? Auth.chapters[themeId][i].icon : "chapter-no-icon.png"}" alt="">
                        <h4>${Auth.chapters[themeId][i].title}</h4>
                        <p>${prepareChapterDescription(Auth.chapters[themeId][i].description)}</p>
                        <h3>${ numberToBRL(Auth.chapters[themeId][i].price)}</h3>
                        <button class="btn btn-primary btn-sm" type="button" onclick="Student.Product.view('${Auth.chapters[themeId][i]._id}')">${string.buttons.buy}</button>
                        <button class="btn btn-default btn-sm" type="button" onclick="Student.Content.openChapter(${themeId}, '${Auth.chapters[themeId][i]._id}', false)">${string.commons.open}</button>
                    </div>
                </div>`
        }

    }

    $('#classroom-content-navigation-display').html(chaptersMarkup);
}

export { showChapters }
