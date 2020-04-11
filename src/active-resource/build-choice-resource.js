function buildChoiceResource(resource, id) {
    /// #if DEBUG
    // console.log(resource, id);
    /// #endif

    Student.ActiveResource.resourcesActiveCorrect[id] = resource.items[0];

    shuffle(resource.items);

    let items = '<div class="list-group">'
    for (let i = 0; i < resource.items.length; i++) {
        items += '<a class="list-group-item" onclick="Student.ActiveResource.selectActiveResourceItem(this)">' + resource.items[i] + '</a>';
    }
    items += "</div>";

    let markUp = `
        <div class="panel panel-warning">
            <div class="panel-heading">${resource.question}</div>
            <div class="panel-body">
                ${items}
                <a class="btn btn-warning" onclick="Student.ActiveResource.verifyActiveChoice('${id}', this)">${string.buttons.verify}</a>
            </div>
        </div>`

    return markUp;
}

export { buildChoiceResource }