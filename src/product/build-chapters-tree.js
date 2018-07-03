export default (chapters) => {
    let tree = []

    for (let i=0; i<chapters.length; i++){

        let lessons = []
        for (let ii=0; ii<chapters[i].lessons.length; ii++){
            let tags = `<div class="pull-right clear">`
            for (let iii = 0; iii < chapters[i].lessons[ii].tags.length; iii++){
                tags += ` <span class="label label-default">${chapters[i].lessons[ii].tags[iii]}</span>`
            }
            tags += "</div>"

            let lesson = {
                text: `${chapters[i].lessons[ii].title} - <small>${chapters[i].lessons[ii].subtitle}</small>${tags}`,
                selectable: false,
            }

            lessons.push(lesson)
        }

        let tags = ``
        for (let ii = 0; ii < chapters[i].tags.length; ii++) {
            tags += `<span class="label label-default">${chapters[i].tags[ii]}</span> `
        }

        let chapter = {
            text: `${chapters[i].title} <small>${chapters[i].description}</small><div class="pull-right clear">
                ${tags}
                <span class="text-muted"> | <i>${string.productDetail.author}</i></span>
                <span class="text-primary">${chapters[i].author.nickname} </span>
                <span class="text-muted glyphicon glyphicon-pencil" aria-hidden="true"></span>`,
            selectable: false,
            nodes: lessons
        }

        tree.push(chapter)
    }

    return tree
}
