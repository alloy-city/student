function buildGapsResource(resource, id) {
    Student.ActiveResource.gapsAnswer[id] = []

    let body = `<form class="form-inline"><div class="form-group" id="${id}">`
    for (var i = 0; i < resource.items.length; i++) {
        if (isEven(i)) {
            body += resource.items[i]
        } else {
            Student.ActiveResource.gapsAnswer[id].push({ answer: resource.items[i], userAnswer: '' })
            body += '<input type="text" class="form-control">'
        }
    }
    body += '</div></form>'

    var markUp = `
        <div class="panel panel-success">
            <div class="panel-heading">
                ${resource.question}
            </div>
            <div class="panel-body">
                ${body}
                <button class="btn btn-default" onclick="Student.ActiveResource.checkGapFills('${id}')">${string.buttons.verify}</button>
            </div>
        </div>`

    return markUp;
}

export { buildGapsResource }