function buildChoiceResource(resource) {
    Student.ActiveResource.resourcesActiveCorrect[resource._id] = resource.resource.items[0];

    shuffle(resource.resource.items);

    let items = '<div class="list-group">'
    for (let i = 0; i < resource.resource.items.length; i++) {
        items += `<a class="list-group-item ${resource.solved && resource.resource.items[i] == Student.ActiveResource.resourcesActiveCorrect[resource._id] ? "active" : ""}" onclick="Student.ActiveResource.selectActiveResourceItem(this)">` + resource.resource.items[i] + '</a>';
    }
    items += "</div>";

    let markUp = `
        <div class="panel panel-warning">
            <div class="panel-heading">${resource.resource.question}</div>
            <div class="panel-body">
                ${items}
                <a class="btn btn-warning" onclick="Student.ActiveResource.verifyActiveChoice('${resource._id}', this)">${string.buttons.verify}</a>
            </div>
        </div>`

    return markUp;
}

export { buildChoiceResource }
