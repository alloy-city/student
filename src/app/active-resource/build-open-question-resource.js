function buildOpenQuestionResource(resource) {
    var markUp = `
        <div class="panel panel-danger">
            <div class="panel-heading">${resource.question}</div>
            <div class="panel-body">
                <div class="form-group">
                    <textarea id="${resource._id}" class="form-control" rows="5" placeholder="${string.missions.typeHere}"></textarea>
                </div>
                <button type="button" class="btn btn-info btn-save" onclick="Student.ActiveResource.saveOpenQuestionAnswer('${resource._id}')">${string.buttons.save}</button>
            </div>
        </div>`

    return markUp
}

export { buildOpenQuestionResource }