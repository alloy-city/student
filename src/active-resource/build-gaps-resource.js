function buildGapsResource(resource) {
    Student.ActiveResource.gapsAnswer[resource._id] = []

    let body = `<form class="form-inline"><div class="form-group" id="${resource._id}">`
    for (var i = 0; i < resource.resource.items.length; i++) {
        if (isEven(i)) {
            body += resource.resource.items[i]
        } else {
            if (resource.solved) {
                Student.ActiveResource.gapsAnswer[resource._id].push({ answer: resource.resource.items[i], userAnswer: resource.resource.items[i] })
                body += `<input type="text" class="form-control" value="${resource.resource.items[i]}">`
            } else {
                Student.ActiveResource.gapsAnswer[resource._id].push({ answer: resource.resource.items[i], userAnswer: '' })
                body += '<input type="text" class="form-control">'
            }
        }
    }
    body += '</div></form>'

    var markUp = `
        <div class="panel panel-success">
            <div class="panel-heading">
                ${resource.resource.question}
            </div>
            <div class="panel-body">
                ${body}
                <button class="btn btn-warning" onclick="Student.ActiveResource.checkGapFills('${resource._id}')">${string.buttons.verify}</button>
            </div>
        </div>`

    return markUp;
}

export { buildGapsResource }
