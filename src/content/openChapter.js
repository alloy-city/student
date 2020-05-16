import { post } from '../http';
import { hasAccess } from "./hasAccess";
import { mountChapterNavigation } from './mountChapterNavigation';

function openChapter(themeIndex, _id, ownsAll) {
    /// #if DEBUG
    // console.log(themeIndex)
    // console.log(_id)
    // console.log(Auth.chapters)
    /// #endif

    mountChapterNavigation();

    for (let [i, chapter] of Auth.chapters[themeIndex].entries()){
        if (chapter._id == _id){
            post({ ids: chapter.lessons }, `eclass/s`, lessons => {
                let title = document.getElementById("classroom-content-navigation-title")
                let description = document.getElementById("classroom-content-navigation-description")
                let container = document.getElementById("classroom-content-navigation-display")

                title.innerText = chapter.title
                description.innerText = chapter.description

                lessons.sort(compare)
                /// #if DEBUG
                // console.log(lessons)
                /// #endif

                for(let i=0; i<lessons.length; i++) {
                    Student.chapterNavigation.lessons[i] = lessons[i]._id;
                }

                // clear content container
                container.innerHTML = ""
                let markup = `
                    <button type="button" class="btn btn-primary" onclick="Student.Content.showChapters(${Student.Content.theme})">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        ${string.buttons.goBack}
                    </button>
                    <div class="row">`

                for (let i=0; i<lessons.length; i++){
                    let lesson = lessons[i];

                    if (hasAccess(lesson._id) || ownsAll || lesson.price == 0){
                        markup += `
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" onclick="Student.Content.selectEclassToStudy(${i})" role="button">
                                <div class="thumbnail lesson-card">
                                    <img src="/images/lesson-icons/${lesson.icon ? lesson.icon : "lesson-no-icon_v2.png"}" alt="">
                                    <div class="progress" style="height:6px;margin-top:5px;">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="${lesson.progression*100}" aria-valuemin="0" aria-valuemax="100" style="width: ${lesson.progression*100}%;">
                                            <span class="sr-only">${lesson.progression*100}% Complete</span>
                                        </div>
                                    </div>
                                    <h4>${lesson.title}</h4>
                                    <p>${lesson.subtitle}</p>
                                    <button class="btn btn-primary btn-sm" type="button">${string.commons.open}</button>
                                </div>
                            </div>`
                    } else {
                        markup += `
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                <div class="thumbnail lesson-card">
                                    <img src="/images/lesson-icons/${lesson.icon ? lesson.icon : "lesson-no-icon_v2.png"}" alt="">
                                    <h4>${lesson.title}</h4>
                                    <p>${lesson.subtitle}</p>
                                    <div>
                                        <h3 class="text-primary">${numberToBRL(lesson.price)}</h3>
                                        <button class="btn btn-success btn-sm" type="button" onclick="Student.Product.view('${lesson._id}')">${string.buttons.buy}</button>
                                    </div>
                                </div>
                            </div>`
                    }
                }

                $(container).html(markup)
            })

            break
        }
    }
}

function compare(a, b) {
    if (a.title < b.title)
        return -1;
    if (a.title > b.title)
        return 1;
    return 0;
}

export { openChapter }
