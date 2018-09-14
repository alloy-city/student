import { themeIcons } from '../theme-icons'

export function showThemes() {
    $("#classroom-content-navigation-title").html(string.material.themesTitle)
    $("#classroom-content-navigation-description").html(string.material.themesDescription)

    let themesMarkup = `<div class="row">`

    for (let i = 0; i < themeIcons.length; i++) {
        if (themeIcons[i] != "no-theme-icon") {
            themesMarkup += `
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" role="button" onclick="Student.Content.showChapters(${i})">
                <div class="thumbnail theme-thumbnail">
                  <img class="theme-thumbnail-img" src="/images/theme-icons/${themeIcons[i]}_${Auth.userData.uiLanguage}.png" alt="${string.material.themes[i].title}">
                </div>
              </div>`
        }
    }

    themesMarkup += `</div>`

    $('#classroom-content-navigation-display').html(themesMarkup);
}