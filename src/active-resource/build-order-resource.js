function buildOrderResource(resource) {
    Student.Content.selectedEclass.order.push(resource);

    Student.ActiveResource.resourcesOrder[resource._id] = resource.resource.items.slice();
    if (!resource.solved) shuffle(resource.resource.items);

    let items = '';

    for (var i = 0; i < resource.resource.items.length; i++) {
        items = items + `<a value="0" name="${resource.resource.items[i]}" class="list-group-item">${resource.resource.items[i]}</a>`
    }

    var markUp = `
        <div class="panel panel-warning">
            <div class="panel-heading">
                ${resource.resource.question}
            </div>
            <div class="panel-body">
                <div id="${resource._id}" class="list-group pointer">
                    ${items}
                </div>
                <button type="button" class="btn btn-success" onclick="Student.ActiveResource.checkOrder('${resource._id}')">
                    ${string.buttons.verify}
                </button>
            </div>
        </div>`

    return markUp;
}

export { buildOrderResource }
