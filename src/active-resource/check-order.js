import { saveXpEntry } from './save-xp-entry'

function checkOrder(id) {
    let nOfCorrectItems = 0;
    $(`#${id}`).children().each(function (i) {
        if ($(this).attr('name') == Student.ActiveResource.resourcesOrder[id][i]) {
            nOfCorrectItems++
            if ($(this).val() == 0) {
                $(this).append('<span class="glyphicon glyphicon-ok pull-right text-success" aria-hidden="true"></span>')
                $(this).val(1)
            }
        } else {
            $(this).children('span').remove()
            $(this).val(0)
        }
    })

    if (nOfCorrectItems == Student.ActiveResource.resourcesOrder[id].length) {
        /// #if DEBUG
        // console.log("all correct!")
        /// #endif

        notify(string.activeResources.right, 'success', false);
        saveXpEntry(id);
    } else {
        notify(string.activeResources.oneOrMoreWrong, 'danger', false);
    }
}

export { checkOrder }